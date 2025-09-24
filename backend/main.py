from fastapi import FastAPI
from backend.routers import youtube, chat, pdf, flashcards

app = FastAPI()

#including feature -specific routes
app.include_router(youtube.router, prefix="/api/youtube", tags=["YouTube"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chatbot"])
app.include_router(pdf.router, prefix="/api/pdf", tags=["PDF Summarizer"])
app.include_router(flashcards.router, prefix="/api/flashcards", tags=["Flashcards"])
app.include_router(youtube.router)
app.include_router(chat.router)

@app.get("/")
def read_root():
    return {"message": "NoteGPT backend is up and running"}