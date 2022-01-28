FROM python:3.9.5-slim-buster

ENV PYTHONUNBUFFERED 1

WORKDIR /ocr_app

RUN apt-get update && apt-get install -y poppler-utils
RUN apt-get install -y tesseract-ocr
RUN apt-get install -y libtesseract-dev
COPY requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt


COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

EXPOSE 5000