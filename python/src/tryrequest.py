import requests

response = requests.post(
    url="http://127.0.0.1:8000/login",
    json={
        "login": "new_user14",
        "password": "12345678",
        "email": "lol14@gmail.com",
        "role": "student",
    },
)
key = response.json()["session_key"]
print(response.json())

# response = requests.post(
#     url="http://127.0.0.1:8000/signup",
#     json={
#         "login": "new_user16",
#         "password": "12345678",
#         "email": "lol16@gmail.com",
#         "role": "student",
#     },
# )


# key = response.json()["session_key"]
# print(response.json())
# response = requests.post(
#                          url="http://127.0.0.1:8000/teacher/create-course",
#                          json={
#                              "title": "LOL2",
#                              "desc": "LOLOLOL",
#                          }, headers={'session_key': key}
#                          )
# print(response.json())

# key = '80417dce-8d4d-4b20-8cff-70882d1135fc'

# response = requests.post(
#     url="http://127.0.0.1:8000/user/courses", headers={"session_key": key}
# )
# print(response.json())


# response = requests.post(
#     url="http://127.0.0.1:8000/user/add2course/1",
#     headers={'session_key': key}
# )
# print(response.json())

# response = requests.post(
#     url="http://127.0.0.1:8000/create_repo/89_123867463",
#     headers={'session_key': key}
# )
# print(response.json())

response = requests.post(
    url="http://127.0.0.1:8000/create_repo_with_template/88_123867463_new_user14",
    headers={"session_key": key},
)
print(response.json())
