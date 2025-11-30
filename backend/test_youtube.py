from youtube_transcript_api import YouTubeTranscriptApi

# This is a TED Talk that 100% has captions
TEST_VIDEO_ID = "R1vskiVDwl4" 

print(f"--- TESTING YOUTUBE LIBRARY ---")
print(f"Attempting to download transcript for video: {TEST_VIDEO_ID}")

try:
    transcript = YouTubeTranscriptApi.get_transcript(TEST_VIDEO_ID)
    print("SUCCESS! \u2705")
    print(f"First line of text: {transcript[0]['text']}")
except AttributeError:
    print("FAILURE \u274C: AttributeError")
    print("REASON: Python is finding the wrong 'youtube_transcript_api'.")
    print("SOLUTION: You likely have a file named 'youtube.py' or 'youtube_transcript_api.py' in your folder. Delete it!")
except Exception as e:
    print(f"FAILURE \u274C: Other Error")
    print(f"Error details: {e}")