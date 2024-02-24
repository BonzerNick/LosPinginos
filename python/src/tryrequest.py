import requests
response = requests.post(
                         url="http://127.0.0.1:8000/login",
                         json={
                             "login": "new_user14",
                             "password": "12345678",
                             "email": "lol14@gmail.com",
                             "role": "student"
                         },
                         )
key = response.json()["key"]
print(response.json())

response = requests.post(
                         url="http://127.0.0.1:8000/teacher/create-course",
                         json={
                             "title": "LOL",
                             "desc": "LOLOLOL",
                         }, headers={'key': key}
                         )
print(response.json())
