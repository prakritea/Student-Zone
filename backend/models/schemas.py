from pydantic import BaseModel
from typing import List

class YouTubeRequest(BaseModel):
    url: str

class YouTubeResponse(BaseModel):
    summary: str

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    
class FlashcardRequest(BaseModel):
    topic: str | None = None
    text: str | None = None
    file_name: str | None = None

class Card(BaseModel):
    q: str
    a: str

class FlashcardResponse(BaseModel):
    cards: List[Card]