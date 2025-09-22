from fastapi import FastAPI
from routers import youtube,chat, pdf, flashcards

app = FastAPI()

#include feature-specific routes
app.include_router(youtube.router, prefix="/api/youtube", tags=["YouTube"])
app.include_router(chat.router,)