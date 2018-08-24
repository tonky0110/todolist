# TODO LIST

TodoList with Python and React for test

기본환경 구성
python + Django
Cookiecutter

DB: Postgrasql(sqlite3로 변경예정)
Backend: python + django
FrontEnd: React + redux

url: REST API


cookiecutter 설치
pip install cookiecutter
project Name: todolist

cd C:\workspace\todolist

python 버블 생성
pipenv --three

django library설치 
pipenv install -r requirements/local.txt


장고실행
django-admin

python버블 들어가기
pipenv shell


데이터베이스설정.
config/settings/base.py
    ...
    DATABASES = {
        'default': env.db('DATABASE_URL', default='postgres://localhost/todolist'),
    }
    DATABASES['default']['ATOMIC_REQUESTS'] = True
    ...

Database 생성
PGAdmin >> 
create user: todolist
create database: todolist


app 생성.
django에서는 1개의 프로젝트 내에 여러개의 application을 가지고 있고 이를 다른 프로젝트에서 재활용 가능
(ex. users, images, todos, notifications, ...) 
cd todolist
django-admin startapp todos


app연결
config/settings/base.py
    LOCAL_APPS = [
        ...
        'todolist.todos.apps.TodosAppConfig',
    ]

todos/apps.py
    ...
    class TodosAppConfig(AppConfig):
        name = 'todolist.todos'
    ...

djang ORM method.
create()
get()
filter()  -- title__startswith, title__istartswith, contains, icontains, lt, gt, 
all()
save()
delete()
