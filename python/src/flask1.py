import uuid
import requests
import psycopg2
from connection_config import connection_params
import hashlib
from fastapi import Body, FastAPI, Header, Request
import uvicorn


app = FastAPI()

user_sessions = {}


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
            "SELECT role FROM client "
            "WHERE login = %s and password = %s",
            (username, hashed_password)
        )
        role = cursor.fetchone()
        if role:
            session_key = str(uuid.uuid4())
            user_sessions[session_key] = role
            conn.commit()
            return {"key": session_key}
        else:
            return {"message": "wrong login or password"}


@app.post("/logout")
async def logout(request: Request):
    session_key = request.headers["key"]
    print(session_key)
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

uvicorn.run(app, host='0.0.0.0')
