# backend/routers/ppt.py

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from services.ppt_logic import generate_slide_content, build_ppt_from_content
from models.schemas import PPTRequest

import uuid
import os

router = APIRouter()

@router.post("/ppt/generate")
def generate_ppt(req: PPTRequest):
    try:
        slides = generate_slide_content(req.topic, req.num_slides)
        if not slides:
            raise HTTPException(status_code=500, detail="Failed to generate slide content.")
        
        # generate a unique filename
        fname = f"ppt_{uuid.uuid4().hex}.pptx"
        output_path = os.path.join("generated", fname)
        os.makedirs("generated", exist_ok=True)
        
        build_ppt_from_content(slides, req.template_id, output_path)
        
        # Return file for download
        return FileResponse(path=output_path, filename=f"{req.topic}.pptx", media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
