FROM python:3.11 AS builder 

ENV PYTHONFAULTHANDLER=1 \
    PYTHONHASHSEED=random \
    PYTHONUNBUFFERED=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=true
    
RUN apt-get update && apt-get install -y gcc libffi-dev g++

WORKDIR /app

ENV PIP_DEFAULT_TIMEOUT=100 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1 \
    POETRY_VERSION=1.5.1

RUN pip install "poetry==$POETRY_VERSION"

COPY pyproject.toml poetry.lock /app/

RUN poetry config installer.max-workers && poetry install --only main --no-interaction --no-ansi


FROM python:3.11-slim AS runtime

WORKDIR /app

ENV PATH=/app/.venv/bin:$PATH
COPY --from=builder /app/.venv .venv
COPY src src
COPY entrypoint.sh entrypoint.sh

ENTRYPOINT ["sh", "entrypoint.sh"]
CMD ["src/check_connection.py"]
