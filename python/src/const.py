from dataclasses import dataclass
from os import getenv

BASE_URL = getenv('BASE_URL')
TOKEN = getenv('TOKEN')


@dataclass
class Role:
    TEACHER: str = "teacher"
    ADMIN: str = "admin"
