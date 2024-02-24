import uuid
import requests
import psycopg2
from connection_config import connection_params
import hashlib
from fastapi import Body, FastAPI, Header, Request
import uvicorn
from dataclasses import dataclass


@dataclass
class User:
    role: str
    user_id: int


app = FastAPI()

user_sessions: dict[str, User] = {}


@app.post("/signup")
async def register(data=Body()):
    # Получение данных из запроса
    # Проверка наличия необходимых данных в запросе
    if 'login' not in data or 'password' not in data or (
            'email' not in data or 'role' not in data
    ):
        return {'message': 'Missing username, password, email or role'}

    # Получение имени пользователя и пароля из запроса
    username = data['login']
    password = data['password']
    email = data['email']
    role = data['role']
    if len(password) < 8:
        return {'message': 'Pass len less than 8 symbols'}
    # Хэширование пароля
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    response = requests.post(
        url="http://10.124.20.57:4000/api/v1/admin/users",
        json={
            "email": email,
            "full_name": username,
            "login_name": username,
            "must_change_password": False,
            "password": password,
            "send_notify": True,
            "source_id": 0,
            "username": username
        },
        headers={
            "Authorization": "token 3dc7c38c526c10676"
                             "533e1262d6b75c7020a05b9"
        })
    # Добавление нового пользователя в базу данных
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO client "
            "(login, password, role, email) "
            "VALUES (%s, %s, %s, %s)",
            (response.json()['login'], hashed_password, role, email)
        )
        return {
                   'message': 'User registered successfully',
                   'username': username
               }, 201


# Эндпоинт для входа пользователя
@app.post("/login")
async def login(data=Body()):
    if 'login' not in data or 'password' not in data:
        return {'message': 'Missing username or password'}

    username = data['login']
    password = data['password']
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    # Поиск пользователя в базе данных
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, role FROM client "
            "WHERE login = %s and password = %s",
            (username, hashed_password)
        )
        user_id, role = cursor.fetchone()
        if user_id:
            session_key = str(uuid.uuid4())
            user_sessions[session_key] = User(role=role, user_id=user_id)
            conn.commit()
            return {"session_key": session_key}
        else:
            return {"message": "wrong login or password"}


@app.post("/logout")
async def logout(request: Request):
    session_key = request.headers["session_key"]
    del user_sessions[session_key]
    return {"message": "ok"}


@app.post("/create-git-user")
async def create_git_user(data=Body()):
    # Проверка наличия необходимых данных в запросе
    if 'username' not in data or 'password' not in data or (
            'email' not in data
    ):
        return {'error': 'Missing username, password or email', 'code': 400}
    # Получение имени пользователя и пароля из запроса
    username = data['username']
    password = data['password']
    email = data['email']
    if len(password) < 8:
        return {'error': 'Pass len less than 8 symbols', 'code': 400}
    response = requests.post(
        url="http://10.124.20.57:4000/api/v1/admin/users",
        json={
            "email": email,
            "full_name": username,
            "login_name": username,
            "must_change_password": False,
            "password": password,
            "send_notify": True,
            "source_id": 0,
            "username": username
        },
        headers={
            "Authorization": "token 3dc7c38c526c10676"
                             "533e1262d6b75c7020a05b9"
        })
    return response.json() | {'code': response.status_code}


@app.post("/teacher/create-course")
async def create_course(request: Request):
    print(user_sessions)
    session_key = request.headers["session_key"]
    data = await request.json()
    print(session_key)
    user = user_sessions.get(session_key)
    print(user)
    if not user or user.role != "teacher":
        return {'message': 'no permissions'}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO course "
            "(author_id, title, description, thumbnail) "
            "VALUES (%s, %s, %s, %s) returning id",
            (user.user_id, data["title"], data["desc"], "")
        )
        course_id = cursor.fetchone()[0]
        return {'id': course_id}


@app.post("/user/courses")
async def user_courses(request: Request):
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user or user.role != "teacher":
        return {'message': 'no permissions'}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, title, description, thumbnail FROM course "
            "where author_id = %s",
            (user.user_id,),
        )
        courses = []
        for course_info in cursor.fetchall():
            course_id, title, description, thumbnail = course_info
            courses.append(
                {
                    "id": course_id,
                    "thumbnail": thumbnail,
                    "title": title,
                    "desc": description
                }
            )
        return courses


@app.post("/user/add2course/{course_id}")
async def add2course(course_id: str, request: Request):
    print(course_id)
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user:
        return {'message': 'no permissions'}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usercourses "
            "(user_id, course_id) "
            "VALUES (%s, %s)",
            (user.user_id, course_id)
        )
        return {"message": "ok"}

uvicorn.run(app, host='0.0.0.0')


# @app.post("/course/<id>/entries")
# async def root():
#     return "Fuck you!"

# @app.post("/course/<id>/overview")
# async def root():
#     return "Fuck you!"

# @app.post("/course/<course-id>/entry/<entry-id>")
# async def root():
#     return "Fuck you!"

# @app.post("/comments/<id>")
# async def root():
#     return "Fuck you!"

# @app.post("/comments/add/<id>")
# async def root():
#     return "Fuck you!"

# @app.post("/content/<id>")
# async def root():
#     return "Fuck you!"

# @app.post("/user/add2course/<course-name>")
# async def root():
#     return "Fuck you!"


uvicorn.run(app, host="0.0.0.0")
