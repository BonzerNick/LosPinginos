from dataclasses import dataclass

BASE_URL = "http://10.124.20.57:4000/api/v1"
TOKEN = "token 3dc7c38c526c10676" "533e1262d6b75c7020a05b9"


@dataclass
class Role:
    TEACHER: str = "teacher"
    ADMIN: str = "admin"
