# backend/routers/flashcards.py

from fastapi import APIRouter, HTTPException
from models.schemas import FlashcardRequest, FlashcardResponse
from services.flashcards_logic import generate_flashcards

router = APIRouter()

@router.post("/flashcards", response_model=FlashcardResponse)
def flashcards_endpoint(req: FlashcardRequest):
    try:
        cards = generate_flashcards(req)
        if not cards:
            raise HTTPException(status_code=500, detail="No flashcards generated.")
        return FlashcardResponse(cards=cards)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
