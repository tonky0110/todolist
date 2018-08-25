from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
import datetime

class Todos(APIView):
    def get(self, request, format=None):
        # todo 목록 조회.
        user = request.user
        
        todo_list = []
        
        try:
            todo_list = models.Todo.objects.filter(creator=user)
        except models.Todo.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.TodoSerializer(todo_list, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        print(user)
        title= request.data.get("title")
        print(title)
        if not title:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            print("title", title)
            new_todo = models.Todo.objects.create(creator=user, title=title)

            print("new_todo: ", new_todo)
            serializer = serializers.TodoSerializer(data=new_todo)
            if serializer.is_valid():
                new_todo.save(creator=user)

        beforeIds = request.data.get("beforeIds")
        if not beforeIds: # empty array
            print("beforeIds is none.")
            print("new_todo --", new_todo)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            
        else:
            beforeIds = beforeIds.split(",")
            print("beforeIds:", beforeIds)
            select_before_todos = models.Todo.objects.filter(creator=user, id__in=beforeIds)#.exclude(id=new_todo.id)
            print("select_before_todos.count(): ", select_before_todos)
            for select_before_todo in select_before_todos:
                print("select_before_todo: ", select_before_todo)
                new_refer = models.Refer.objects.create(creator=user, after=new_todo, before=select_before_todo)
                new_refer.save()
                # refer_serializer = serializers.ReferSerializer(new_refer)
                # if refer_serializer.is_valid():
                    

            return Response(status=status.HTTP_201_CREATED)



# Todo detail조회.
class TodoDetail(APIView):

    def find_own_todo(self, todo_id, user):
        try: 
            todo = models.Todo.objects.get(id=todo_id, creator=user)
            return todo
        except models.Todo.DoesNotExist:
            return None
    

    # todo detail 조회.
    def get(self, request, todo_id, format=None):
        user = request.user
        todo = self.find_own_todo(todo_id, user)

        if todo is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.TodoSerializer(todo)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    # todo title, before todos update.
    def put(self, request, todo_id, format=None):
        user = request.user
        todo = self.find_own_todo(todo_id, user)

        if todo is None:    
            return Response(status=status.HTTP_404_NOT_FOUND)

        beforeIds = request.data.get("beforeIds")

        if not beforeIds: # empty array
            # update 시에 전달되는 선행작업이 없는 경우 기존 등로된 refer를 삭제한다.
            try: 
                before_todos = models.Refer.objects.filter(creator=user, after=todo)
                before_todos.delete()
            except models.Refer.DoesNotExist:
                pass
            
            # title update
            title= request.data.get("title")
            if not title:
                print("title", title)
                serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save(creator=user)
#            else:
#                print("title does not chanage.")

        else:
            ## 새로운 선행 todo에 포함되지 않는 목록 삭제
            beforeIds = beforeIds.split(",")
            
            # print("beforeIds: ", beforeIds)

            select_before_todos = models.Todo.objects.filter(creator=user, id__in=beforeIds).exclude(id=todo_id)
            # print("select_before_todos.count():", select_before_todos.count())
            delete_befores = models.Refer.objects.filter(creator=user, after=todo).exclude(before__in=select_before_todos)
            # print("delete_befores.count():", delete_befores.count())
            for delete_before in delete_befores:       
                delete_before.delete();

            for select_before_todo in select_before_todos:                    
                try:
                    before_refer = models.Refer.objects.get(creator=user, after=todo, before=select_before_todo)
                    # print(todo, before_refer)
                except models.Refer.DoesNotExist:
                    new_refer = models.Refer.objects.create(creator=user, after=todo, before=select_before_todo)
                    new_refer.save()

            serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(creator=user)
                return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(
                    data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def delete(self, request, todo_id, format=None):
        user = request.user
        print(user)
        todo = self.find_own_todo(todo_id, user)
        print(todo)

        if todo is None:    
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            after_refers = models.Refer.objects.filter(creator=user, before=todo)
            for after_todo in after_refers:
                print("after_todo ---- ", after_todo)
                after_todo.delete()
            todo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except models.Refer.DoesNotExist:
            todo.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)



# done 처리 프로세스
# 1) 선행 todo list를 조회
# 2) for 선행 in 선행list
#    if 선행.status != done
#      return 
#    else 
#      todo.status = done

class DoneTodo(APIView):
    
    # {"status":"done"}
    def put(self, request, todo_id, format=None):
        # todo status is done update
        user = request.user

        try: 
            todo = models.Todo.objects.get(id=todo_id, creator=user, status="doing")

            befores = models.Refer.objects.filter(creator=user, after=todo).values("before")
            for before in befores:
                try:
                    before_todo = models.Todo.objects.get(id=before.get("before"), creator=user)
                    if before_todo.status != 'done':
                        print(before_todo, " is not done yet.")
                        return Response(status=status.HTTP_400_BAD_REQUEST)

                except models.Todo.DoesNotExist:
                    pass
                    # return Response(status=status.HTTP_400_BAD_REQUEST)
                
            serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(status="done")

            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        except models.Todo.DoesNotExist:
            return Response(data=serializer.errors, status=status.HTTP_404_NOT_FOUND)

      
        
class CancelTodo(APIView):
    # {"status":"doing"}
    def put(self, request, todo_id, format=None):
        # todo status is done update
        user = request.user

        try: 
            todo = models.Todo.objects.get(id=todo_id, creator=user, status="done")

            afters = models.Refer.objects.filter(creator=user, before=todo).values("after")
            for after in afters:
                try:
                    after_todo = models.Todo.objects.get(id=after.get("after"), creator=user)
                    if after_todo.status == 'done':
                        print(after_todo, " is already done.")
                        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

                except models.Todo.DoesNotExist:
                    pass
                    # return Response(status=status.HTTP_404_NOT_FOUND)
                
            serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(status="doing")

            return Response(data=serializer.data, status=status.HTTP_202_ACCEPTED)

        except models.Todo.DoesNotExist:
            print("todo is none.")
            return Response(status=status.HTTP_404_NOT_FOUND)
            

            
class Search(APIView):
    def get(self, request, format=None):

        user = request.user
        term = request.query_params.get('terms', None)
        print(request)
        print("terms --- ", term)
        print("type of terms --- ", type(term))
        todo_list = []
        if term:
            
            try:
                search_title_todos = models.Todo.objects.filter(creator=user, title__icontains=term)
                print("search_title_todos: ", search_title_todos.count())
                for search_title_todo in search_title_todos:
                    todo_list.append(search_title_todo)
            except models.Todo.DoesNotExist:
                pass

            if '-' in term:
                term = term.split("-")
                print("type of terms --- ", type(term))
                print("len(term):    ", len(term))
                if term:
                    if len(term) == 3:
                        try:
                            search_created_todos = models.Todo.objects.filter(
                                created_at__year=int(term[0]),
                                created_at__month=int(term[1]),
                                created_at__day=int(term[2]))
                            
                            print("search_created_todos: ", search_created_todos.count())
                            for search_created_todo in search_created_todos:
                                todo_list.append(search_created_todo)
                        except models.Todo.DoesNotExist:
                            pass
                        try:
                            search_updated_todos = models.Todo.objects.filter(
                                updated_at__year=int(term[0]),
                                updated_at__month=int(term[1]),
                                updated_at__day=int(term[2]))
                            
                            print("search_updated_todos: ", search_updated_todos.count())
                            for search_updated_todo in search_updated_todos:
                                todo_list.append(search_updated_todo)
                        except models.Todo.DoesNotExist:
                            pass
                
            sorted_list = sorted(todo_list, key=lambda todo: todo.created_at, reverse=True)
            sorted_list = set(sorted_list)
            print("sorted_list:  ", sorted_list)
            serializer = serializers.TodoSerializer(sorted_list, many=True)
            # serializer = serializers.TodoSerializer(todo_list, many=True)

            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)