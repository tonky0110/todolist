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


migration
Django ORM을 통해서 생성된 table을 migration을 통해서 자동생성&변경
pytho object --> table로 전환
    commend:
    python manage.py makemigrations
    python manage.py migrate


관리자 계정 생성
    commend:
    python manage.py createsuperuser

    todoadmin/********

urls: http://127.0.0.1:8000/admin/



REST API
todos/
    get: 사용자가 등록한 모든 todo 목록조회(paging 처리는 추가 수정에정))
    post: 신규 todo 등록

todos/${todoId}/
    get: todo detail 조회
    put: todo 수정(refer(선행todo) 항목 추가 및 삭제 처리 포함.)
    delete: todo삭제

todos/${todoId}/done/
    put: todo 완료 처리(선행 todo 상태(doing) 확인 후 완료가능여부 확인.)

todos/${todoId}/cancel/
    put: todo 완료 취소 처리(후행 todo 상태(done)) 확인 후 완료가능여부 확인.)

todos/search/?term={term}
    get: title, created_at, update_at 조회 후 목록 반환.


# Frontend
 yarn global add create-react-app
 create-react-app frontend
 cd ./frontend
 
 yarn add html-webpack-plugin

 yarn eject

SCSS plugin설치.
 sass loader && node-sass설치
 yarn add sass-loader node-sass

 scss loader를 환 환경설정 파일 수정
 webpack.config.dev.js
 webpack.config.prop.js