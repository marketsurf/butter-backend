from PIL import Image
from pdf2image import convert_from_path, convert_from_bytes
import pytesseract
import magic

import os
import sys
import pathlib
import tempfile

import errors

class PDFReader(object):
    def __init__(self, pdf_filename: str, pdf_bytes: bytes, is_file: bool = True) -> None:
        self._PDF_BYTES = None
        self._FILENAME = "temp.pdf"
        self._is_file = is_file

        if is_file:
            try:
                self.validate_pdf_bytes(pdf_filename)
            except FileNotFoundError as e:
                print(f"Error: {e}")
        else:
            self._PDF_BYTES = pdf_bytes

        try:
            self.validate_pdf_bytes()
        except errors.InvalidPDFFile as e:
            print(f"Error: {e}")

        self.out_text = self.process_pdf()

    def validate_pdf_bytes(self):
        if not (self._PDF_BYTES and "pdf" in magic.from_buffer(self._PDF_BYTES)):
            raise errors.InvalidPDFFile("PDF file is not valid")

    def pdf_file_exists(self, pdf_filename):
        self._FILENAME = pdf_filename
        filepath = pathlib.Path(self._FILENAME)

        if filepath.is_file():
            with open(filepath, "rb") as f:
                self._PDF_BYTES = f.read()
        else:
            raise FileNotFoundError(f"PDF file {self._FILENAME} not found.")

    def process_pdf(self) -> list:
        out_text = []

        if self._is_file:
            pages = convert_from_path(self._FILENAME, fmt="jpg")
        else:
            pages = convert_from_bytes(self._PDF_BYTES, fmt="jpg")
            
        for idx, img in enumerate(pages):
            text = str(pytesseract.image_to_string(img))
            text = text.replace('-\n', '')
            out_text.append(text)

        return out_text

    
    @property
    def text(self):
        return self.out_text

        

        