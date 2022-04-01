FROM python:3.9.5-slim-buster

ENV PYTHONUNBUFFERED 1

WORKDIR /ocr_app

RUN apt-get update && apt-get install -y poppler-utils
RUN apt-get install -y tesseract-ocr
RUN apt-get install -y libtesseract-dev
COPY requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

COPY /etc/letsencrypt/live/api.marketsurf.io/fullchain.pem ./server.crt
COPY /etc/letsencrypt/live/api.marketsurf.io/privkey.pem ./server.key

COPY . .

CMD [ "gunicorn", "--certfile=server.crt", "--keyfile=server.key", "--bind=0.0.0.0:5000", "app:app" ]

EXPOSE 5000