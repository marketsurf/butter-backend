from PIL import Image
from pdf2image import convert_from_bytes
import pytesseract
import magic

from io import BytesIO
import uuid
import os

import errors

class PDFReader(object):
    def __init__(self, pdf_bytes: bytes) -> None:
        self._PDF_BYTES = pdf_bytes

        try:
            self.validate_pdf_bytes()
        except errors.InvalidPDFFile as e:
            print(f"Error: {e}")

        self.out_text = self.process_pdf()


    def validate_pdf_bytes(self):
        return self._PDF_BYTES and "pdf" in magic.from_buffer(self._PDF_BYTES, mime=True)


    def process_pdf(self) -> list:
        out_text = []

        pages = convert_from_bytes(self._PDF_BYTES, fmt="jpg")
            
        for img in pages:
            b = BytesIO()
            img.save(b, "JPEG")
            text = str(pytesseract.image_to_string(Image.open(b)))
            b.close()
            text = text.replace('-\n', '')
            out_text.append(text)

        return out_text

    
    @property
    def text(self):
        return self.out_text

        
def main():
    try:
        with open("/home/woohoo/msprofile.pdf", "rb") as in_pdf:
            data = in_pdf.read()
        print(data[:10])
        reader = PDFReader(data)
        print(reader.text)
    except FileNotFoundError as e:
        print(f"Error: {e}")


if __name__ == '__main__':
    main()
        