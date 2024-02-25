import hashlib
import uuid
from dataclasses import dataclass

import psycopg2
import psycopg2.extras
import requests
import uvicorn
from connection_config import connection_params
from fastapi import Body, FastAPI, Header, Request
from string import digits


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
    if (
            "login" not in data
            or "password" not in data
            or ("email" not in data or "role" not in data)
    ):
        return {"message": "Missing username, password, email or role"}

    # Получение имени пользователя и пароля из запроса
    username = data["login"]
    password = data["password"]
    email = data["email"]
    role = data["role"]
    if len(password) < 8:
        return {"message": "Pass len less than 8 symbols"}
    # Хэширование пароля
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    response = requests.post(
        url="http://127.0.0.1:4000/api/v1/admin/users",
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
            "INSERT INTO client "
            "(login, password, role, email) "
            "VALUES (%s, %s, %s, %s)",
            (response.json()["login"], hashed_password, role, email),
        )
        return {"message": "User registered successfully", "username": username}, 201


# Эндпоинт для входа пользователя
@app.post("/login")
async def login(data=Body()):
    if "login" not in data or "password" not in data:
        return {"message": "Missing username or password"}

    username = data["login"]
    password = data["password"]
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    # Поиск пользователя в базе данных
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, role FROM client " "WHERE login = %s and password = %s",
            (username, hashed_password),
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


@app.post("/teacher/create-course")
async def create_course(request: Request):
    print(user_sessions)
    session_key = request.headers["session_key"]
    data = await request.json()
    print(session_key)
    user = user_sessions.get(session_key)
    print(user)
    if not user or user.role != "teacher":
        return {"message": "no permissions"}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO course "
            "(author_id, title, description, thumbnail) "
            "VALUES (%s, %s, %s, %s) returning id",
            (user.user_id, data["title"], data["desc"], ""),
        )
        course_id = cursor.fetchone()[0]
        return {"id": course_id}


@app.post("/user/courses")
async def user_courses(request: Request):
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user or user.role != "teacher":
        return {"message": "no permissions"}
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
                    "desc": description,
                }
            )
        return courses


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


@app.post("/user/add2course/{course_id}")
async def add2course(course_id: str, request: Request):
    print(course_id)
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user:
        return {"message": "no permissions"}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO usercourses " "(user_id, course_id) " "VALUES (%s, %s)",
            (user.user_id, course_id),
        )
    return {"message": "ok"}


@app.post("/create_repo/{task_course_id}")
async def create_repo(task_course_id: str, request: Request):
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user:
        return {"message": "no permissions"}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT login FROM client WHERE id = %s",
            (user.user_id,),
        )
        login = cursor.fetchone()[0]
    response = requests.post(
        # url = url,
        url=f"http://127.0.0.1:4000/api/v1/admin/users/{login}/repos",
        json={
            "template": True,
            "name": task_course_id + "_" + login,
        },
        headers={"Authorization": "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"},
    )
    print(response.status_code)
    return response.json()


@app.post("/create_repo_with_template/{template_repo}")
async def create_repo(template_repo: str, request: Request):
    session_key = request.headers["session_key"]
    user = user_sessions.get(session_key)
    if not user:
        return {"message": "no permissions"}
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT login FROM client WHERE id = %s",
            (user.user_id,),
        )
        login = cursor.fetchone()[0]
        #####################

    template_owner = template_repo.split("_")[2:]
    template_owner = "_".join(template_owner)
    print(template_owner)
    #####################
    response = requests.post(
        # url = url,
        url=f"http://127.0.0.1:4000/api/v1/repos/{template_owner}/{template_repo}/generate",
        json={
            "name": template_repo + login,
            "owner": login,
            "git_content": True,
        },
        headers={"Authorization": "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"},
    )
    print(response.text)
    print(response.status_code)
    return {"message": "ok"}


@app.post('/git-hook')
async def process_git_hook(request: Request):
    payload = await request.json()
    owner = payload["repository"]["owner"]["login"]
    repo_name = payload["repository"]["owner"]["name"]
    commits = payload["repository"]["commits"]
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT 1 FROM course WHERE course_id = %s",
            (repo_name,),
        )
        result = cursor.fetchone()[0]
        if result is not None:
            rebuild_entries(repo_name, owner, repo_name)
            return {"message": "ok"}
        link = f'{owner}/{repo_name}'
        cursor.execute(
            "SELECT 1 FROM usertask WHERE link = %s",
            (link,)
        )
        result = cursor.fetchone()[0]
        if result is not None:
            process_commits(commits, owner, repo_name)
            return {"message": "ok"}
        #####################
    return {"message": "ok"}


def parse_filename(filename):
    for (num_i, chr) in enumerate(filename):
        if chr not in digits:
            if num_i == 0:
                return None
            pos = int(filename[:num_i])
            _type = filename[num_i]
            title = filename[num_i + 1:]
            return pos, _type, title


def rebuild_entries(course_id, owner, repo):
    response = requests.post(
        url=f"http://127.0.0.1:4000/api/v1/repos/{owner}/{repo}/contents",
        headers={"Authorization": "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"},
    )
    files = response.json()
    entries = []
    for file in files:
        parse = parse_filename(file["name"])
        if parse is not None:
            pos, _type, title = parse
            entries.append(
                (title, "task" if _type == "t" else "lecture", course_id, file["name"], pos)
            )

    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM entries WHERE course_id = %s', (course_id,))
        psycopg2.extras.execute_values(
            cursor,
            "INSERT INTO entry(title, type, course_id, link, pos)"
            "VALUES %s",
            entries
        )


def process_commits(commits, owner, repo_name):
    course_id = repo_name
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT is FROM client WHERE login = %s",
            (owner,),
        )
        user_id = cursor.fetchone()[0]
    for commit in commits:
        if "#FINAL" in commit["message"]:
            with psycopg2.connect(**connection_params) as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "UPDATE usertask SET student_status = 'To Grade'"
                    "where user_id = %s, course_id = %s ",
                    (user_id, course_id),
                )


uvicorn.run(app, host="0.0.0.0")
