import psycopg2
from connection_config import connection_params
from flask import Flask, Response, jsonify, request

app = Flask(__name__)


@app.route(
    "/chain-platform-info/<int:platform_id>",
    methods=[
        "GET",
    ],
)
def get_full_platform_info(platform_id):
    return jsonify(
        {
            "data": {
                "platform_name": "LOL",
                "platform_id": platform_id,
                "parser_data": "DATA",
            }
        }
    )


@app.route(
    "/test_db",
    methods=[
        "GET",
    ],
)
def test_db():
    key = request.headers.get("key")
    print(key)
    with psycopg2.connect(**connection_params) as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"""
            select * from postgres
            """
        )
        status_from_table = cursor.fetchall()
    return jsonify({"data": {"status": status_from_table}})


app.run(port=5000)
