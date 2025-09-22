# backend/services/pdf_logic.py

from typing import Union
import io
from transformers import pipeline
from PyPDF2 import PdfReader

# Summarizer model — choose lightweight but good
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def extract_text_from_pdf(file_stream: io.BytesIO) -> str:
    reader = PdfReader(file_stream)
    text = ""
    for page in reader.pages:
        # `extract_text()` may return None or empty string
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def summarize_text(text: str) -> str:
    # chunk if too large
    max_chunk_size = 1000  # adjust as needed
    chunks = [text[i:i + max_chunk_size] for i in range(0, len(text), max_chunk_size)]
    summary = ""
    for chunk in chunks:
        result = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
        summary += result[0]['summary_text'] + " "
    return summary.strip()

def summarize_pdf_file(file) -> str:
    """
    file: File-like (UploadFile.file in FastAPI)
    """
    # Read file bytes
    file_bytes = file.read()
    # Use BytesIO
    stream = io.BytesIO(file_bytes)
    text = extract_text_from_pdf(stream)
    if not text or text.strip() == "":
        raise ValueError("Could not extract any text from PDF")
    summary = summarize_text(text)
    return summary
