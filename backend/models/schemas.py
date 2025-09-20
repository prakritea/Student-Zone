from pydantic import BaseModel

class YouTubeRequest(BaseModel):
    url: str

class YouTubeResponse(BaseModel):
    summary: str
