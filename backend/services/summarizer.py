from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import re

# Initialize Hugging Face summarization pipeline
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

def extract_video_id(url: str) -> str:
    """Extract video ID from the YouTube URL."""
    match = re.search(r"v=([^&]+)", url)
    if match:
        return match.group(1)
    raise ValueError("Invalid YouTube URL")

def get_transcript(video_id: str):
    """Fetch the transcript of the YouTube video."""
    return YouTubeTranscriptApi.get_transcript(video_id)

def summarize_youtube_video(url: str) -> str:
    """Fetch transcript and summarize YouTube video."""
    # Extract video ID from URL
    video_id = extract_video_id(url)
    
    # Fetch transcript for the video
    transcript = get_transcript(video_id)
    
    # Combine all transcript text into a single string
    text = " ".join([entry['text'] for entry in transcript])
    
    # Summarize the text in chunks
    chunks = [text[i:i + 1000] for i in range(0, len(text), 1000)]  # split text into manageable chunks
    summary = ""
    
    # Summarize each chunk and combine
    for chunk in chunks:
        result = summarizer(chunk, max_length=150, min_length=50, do_sample=False)
        summary += result[0]['summary_text'] + " "
    
    return summary.strip()
