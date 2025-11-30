import youtube_transcript_api
import os

print("\n--- 🕵️ DETECTIVE MODE ---")
print("I am asking Python where it found the library...")

# This prints the EXACT location on your computer where the file lives
location = youtube_transcript_api.__file__
print(f"FOUND AT: {location}")

print("\n--- CHECKING CONTENTS ---")
# This lists what is inside that file
print(dir(youtube_transcript_api))

print("\n--- VERDICT ---")
if "site-packages" in location:
    print("✅ It is in the correct installation folder.")
    if "YouTubeTranscriptApi" not in dir(youtube_transcript_api):
         print("❌ BUT... the library seems empty or corrupted.")
    else:
         print("✅ The library looks correct. The issue might be your video link.")
else:
    print("❌ CAUGHT IT! It is loading from a local file instead of the installed library.")
    print(f"👉 Please DELETE this file: {location}")