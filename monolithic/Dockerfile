FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./server /code/server

COPY ./__init__.py /code/__init__.py

COPY ./main.py /code/main.py

CMD ["python", "/code/main.py"]