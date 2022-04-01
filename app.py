from flask import Flask, request
from ocr.ocr import PDFReader, InvalidPDFFile

def get_words(in_bytes: bytes) -> list:
    try:
        reader = PDFReader(in_bytes)
        words = reader.text
    except InvalidPDFFile as e:
        raise e

    return words


app = Flask(__name__)

@app.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    # Other headers can be added here if required
    return response

@app.route("/health", methods=["GET"])
def get_health():
    return "Hello"


@app.route("/ocr", methods=["POST"])
def post_ocr():
    try:
        data = request.get_data()
        words = get_words(data)
    except InvalidPDFFile as e:
        return {
            "error": e
        }, 400

    return {
        "data": words
    }
