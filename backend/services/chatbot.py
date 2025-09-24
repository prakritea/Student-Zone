# services/chatbot.py

from transformers import pipeline

chat_model = pipeline("text-generation", model="distilgpt2")

def generate_chat_response(message: str) -> str:
    """Generate response using Hugging Face model."""
    output = chat_model(message, max_length=100, do_sample=True, top_k=50)[0]['generated_text']
    return output.replace(message, "").strip()
