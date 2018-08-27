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


pipenv lock스킵.
    pipenv install --skip-lock

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

 package.js - proxy 설정.
 



문제해결 전략 및 프로젝트 빌드, 실행방법
문제:
    todo-list 웹 어플리케이션 구현

기능:
    1) 신규 todo 추가
    2) 신규 todo는 기존 todo를 참조가능
        - 참조 대상 todo의 id를 명시하는 방법으로 구현
    3) 기존 todo를 수정가능
    4) todo목록을 조회 가능
        - 조회 항목: title, 작성일(created_at), 수정일(updated_at)
    5) 페이징 처리.
    6) 완료처리 가능
        - 참조 todo가 완료되지 않으면 완료처리 불가.

요구사항:
    1) 웹어플리케이션
    2) java, scala, Golang중 권장( 타언어 선택가능)
    3) 서버는 REST API로 구현
    4) 프론트엔드는 제약없음.
    5) DB는 인메모리 DB를 권장하나 제약없음
    6) 단위테스트 필수, 통합테스트 선택

-->
구현:
    DB: POSTGRASQL
    backend: Python + Django
    Frontend: React
    URL: REST API

    Backend선택 이유: 
    개인적으로 공부중이 Python && Django를 사용하는 경우 요구사항에 따른
    개발환경 구성 및 REST API, DB(ORM으로 변경이 간편함), 사용자 가입 및 로그인(패키지 이용)등의 
    개발환경 구성 및 부가 기능 구현이 쉬움.

    권장항목을 선택하지 않은 이유:
        scala, Golang: 사용해본 경험이 없음.
        java: 회사에서 사용중이나 신규 프로젝트 생성 및 개발 환경설정에 추가적인 시간이 많이 들어 제외

    Frontend선택 이유:
    React - 독학으로 공부중이고 향후 frontend개발에 사용하기 위하여 학습 중, 참고할만한 소스를 찾기 쉬움
    
    todo:
    1) 목록 조회: todos/ + {method: GET}
    2) todo 등록: todos/ + {method: POST}
    3) todo 수정: todos/${todoId}} + {method: PUT}

    4) todo 완료: todos/${todoId}/done + {method: PUT}
        - 참조 todo가 있는 경우 참조todo가 'doing'상태이면 완료 처리 취소.
    5) todo 완료 취소: todos/${todoId}/doing + {method: PUT}
        - 참조 todo가 있는 경우 참조todo가 'done'상태이면 완료 취소 처리 취소.

    6) 검색: todos/search/${terms}
        - 조회가능 항목: title, created_at, update_at
        단, created_at, updated_at은 'yyyy-mm-dd'로 요청.

    
    프로젝트 빌드 방법
    프로젝트 내려받기
        - https://github.com/tonky0110/todolist.git
    1. backend
        python환경구성:
            pipenv --three
            pipenv install -r requirements/local.txt
            pipenv shell
    
        DB TABLE 생성:
            python manage.py makemigrations
            python manage.py migrate
        
        실행:
            python manage.py runserver
        

    2.frontend
        cd frontend
        yarn install
        yarn start
    
    접속:
        http://localhost:3000   //(react 개발화면)
        http://localhost:8000   //(python 호출화면))