import google.generativeai as genai

# PASTE YOUR KEY HERE
API_KEY = "AIzaSyCIIn7l5c73Rdp4D7wRr_AFbZOxmnOTWQ8"

genai.configure(api_key=API_KEY)

print("Checking available models...")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(f"- {m.name}")