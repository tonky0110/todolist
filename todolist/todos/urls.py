from django.conf.urls import url
from . import views

app_name = "todos"
urlpatterns = [
     url(
         regex=r'^$',
         view=views.Todos.as_view(),
         name='todo'
     ),
     url(
         regex=r'^$',
         view=views.Todos.as_view(),
         name='add_todo'
     ),
    url(
        regex=r'^(?P<todo_id>[0-9]+)/$',
        view=views.TodoDetail.as_view(),
        name='todo_detail'
    ),
    url(
        regex=r'^(?P<todo_id>[0-9]+)/$',
        view=views.TodoDetail.as_view(),
        name='delete_todo'
    ),
    url(
        regex=r'^(?P<todo_id>[0-9]+)/done/$',
        view=views.DoneTodo.as_view(),
        name='done_todo'
    ),
    url(
        regex=r'^(?P<todo_id>[0-9]+)/doing/$',
        view=views.DoingTodo.as_view(),
        name='doing_todo'
    ),
    url(
        regex=r'^search/$',
        view=views.Search.as_view(),
        name='search'
    ),
]