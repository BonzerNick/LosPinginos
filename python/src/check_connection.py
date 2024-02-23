import psycopg2
from psycopg2 import OperationalError

def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # Подключение к вашей базе данных PostgreSQL
        print('Подключение к PostgreSQL базе данных...')
        conn = psycopg2.connect(
            dbname="main_database",
            user="bnz",
            password="1234",
            host="database",
            port="5432"
        )

        # Создаем курсор для выполнения операций с базой данных
        cur = conn.cursor()

        # Вывод версии PostgreSQL
        cur.execute('SELECT version()')
        db_version = cur.fetchone()
        print('Версия PostgreSQL:', db_version)

        # Закрываем курсор и соединение с базой данных
        cur.close()

    except OperationalError as e:
        print(f'Ошибка подключения: {e}')

    finally:
        if conn is not None:
            conn.close()
            print('Соединение с базой данных закрыто.')

if __name__ == '__main__':
    connect()
