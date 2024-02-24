import hashlib
import uuid

import psycopg2
import requests
import uvicorn
from connection_config import connection_params
from fastapi import Body, FastAPI

app = FastAPI()


@app.post("/register")
async def register(data=Body()):
    # Получение данных из запроса
    # Проверка наличия необходимых данных в запросе
    if "username" not in data or "password" not in data or ("email" not in data):
        return {"error": "Missing username, password or email", "code": 400}

    # Получение имени пользователя и пароля из запроса
    username = data["username"]
    password = data["password"]
    email = data["email"]
    if len(password) < 8:
        return {"error": "Pass len less than 8 symbols", "code": 400}
    user_id = str(uuid.uuid4())
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
            "username": username,
        },
        headers={"Authorization": "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"},
    )
    # Добавление нового пользователя в базу данных
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO clients (login, client_pass, status, client_key) "
            "VALUES (%s, %s, 1, %s)",
            (username, hashed_password, user_id),
        )
        return {"message": "User registered successfully", "username": username}, 201


# Эндпоинт для входа пользователя
@app.post("/login")
async def login(data=Body()):
    if "username" not in data or "password" not in data:
        return {"error": "Missing username or password", "code": 400}

    username = data["username"]
    password = data["password"]
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    # Поиск пользователя в базе данных
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT login, client_key FROM clients "
            "WHERE login = %s and client_pass = %s",
            (username, hashed_password),
        )
        user, client_key = cursor.fetchone()
        conn.commit()
        return {
            "message": "Logged in successfully",
            "username": username,
            "key": client_key,
            "code": 200,
        }


@app.post("/create-git-user")
async def create_git_user(data=Body()):
    # Проверка наличия необходимых данных в запросе
    if "username" not in data or "password" not in data or ("email" not in data):
        return {"error": "Missing username, password or email", "code": 400}
    # Получение имени пользователя и пароля из запроса
    username = data["username"]
    password = data["password"]
    email = data["email"]
    if len(password) < 8:
        return {"error": "Pass len less than 8 symbols", "code": 400}
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
            "username": username,
        },
        headers={"Authorization": "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"},
    )
    return response.json() | {"code": response.status_code}


uvicorn.run(app, host="0.0.0.0")
