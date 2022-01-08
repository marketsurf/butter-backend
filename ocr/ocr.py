from PIL import Image
from pdf2image import convert_from_path
import pytesseract

import os
import sys
import pathlib
import magic

import errors

class PDFReader(object):
    def __init__(self, pdf_filename: str, pdf_bytes: bytes, is_file: bool = True) -> None:
        self._PDF_BYTES = None
        self._FILENAME = "temp.pdf"

        if is_file:
            self._FILENAME = pdf_filename
            filepath = pathlib.Path(self._FILENAME)

            if filepath.is_file():
                with open(filepath, "rb") as f:
                    self._PDF_BYTES = f.read()
            else:
                raise FileNotFoundError(f"PDF file {self._FILENAME} not found.")
        else:
            self._PDF_BYTES = pdf_bytes

        if not self.validate_pdf():
            raise errors.InvalidPDFFile("Not a valid PDF file.")

    def validate_pdf(self):
        if self._PDF_BYTES:
            mime_type = magic.from_buffer(self._PDF_BYTES)
            return "pdf" in mime_type.lower()
        else:
            return False