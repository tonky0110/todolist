from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


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
        
        # title update
        # {"title":"to change title", "beforeIds":"1,2"}

        serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(creator=user)

            beforeIds = request.data.get("beforeIds")
            
            if beforeIds is None:
                # REFER DELETE && INSERT
                delete_refers = models.Refer.objects.filter(creator=user, after=todo)
                delete_refers.delete()
            else:
                delete_refers = models.Refer.objects.filter(creator=user, after=todo)
                delete_refers.delete()

                beforeIds = beforeIds.split(",")
                befores = models.Todo.objects.filter(creator=user, id__in=beforeIds).distinct()
                
                for before in befores:
                    new_refer = models.Refer.objects.create(creator=user, before=before, after=todo)
                    new_refer.save()

                return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

        else:
            return Response(
                data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoneTodo(APIView):
    # {"status":"done"}
    def put(self, request, todo_id, format=None):
        # todo status is done update
        user = request.user
        try:
            todo = models.Todo.objects.get(creator = user, id=todo_id)
            try:
                print(2)
                befores = models.Refer.objects.filter(creator=user, after=todo).values('before')
                if not befores: # empty array
                    print(3)
                    serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
                    if serializer.is_valid():
                        print(4)
                        serializer.save(creator=user, status="done")
                        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

                else:
                    print(5)
                    for before in befores:
                        print(6)
                        if before.status == 'todo':
                            print(7)
                            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
                    serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
                    if serializer.is_valid():
                        print(8)
                        serializer.save(creator=user, status="done")
                        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

            except models.Refer.DoesNotExist:
                print(9)
                serializer = serializers.InputTodoSerializer(todo, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save(creator=user, status="done")    
                    return Response(data=serializer.data, status=status.HTTP_404_NOT_FOUND)
 
        except models.Todo.DoesNotExist:
            print(10)
            return Response(data=serializer.errors,status=status.HTTP_404_NOT_FOUND)
