# 🎓 LearnAI - Intelligent Study Assistant

**LearnAI** is a modern, AI-powered EdTech platform designed to help students overcome information overload. It instantly transforms text notes, YouTube videos, and PDF documents into concise, structured summaries using **Google's Gemini 2.5 Flash** model.

![Home Screen](screenshots/home.png)

## 🚀 Key Features

- **📝 Text Summarizer:** Paste lecture notes or articles to get instant bullet-point summaries.
- **🎥 YouTube Analysis:** Extracts transcripts from educational videos (using `youtube-transcript-api`) and summarizes key learning outcomes.
- **📄 PDF Processor:** Upload lecture slides or documents (up to 50MB) for automated analysis.
- **⚡ High Performance:** Powered by **FastAPI** (Backend) and **React** (Frontend) for real-time processing.
- **🎨 Glassmorphism UI:** A sleek, modern dark-mode interface built with **Tailwind CSS**.

---

## 🛠️ How It Works

The application follows a modern **Client-Server Architecture**:

1.  **Input Processing (Frontend):**
    - The **React** interface captures user input (Text, URL, or File).
    - It validates the input and sends an asynchronous request to the backend.

2.  **Data Extraction (Backend):**
    - **YouTube:** If a video link is detected, the backend uses `youtube-transcript-api` to extract the hidden captions/transcript.
    - **PDF:** If a file is uploaded, `pypdf` parses the binary content into readable text.

3.  **AI Analysis (The Brain):**
    - The cleaned text is sent to the **FastAPI** server.
    - The server constructs a prompt and streams it to **Google Gemini 2.5 Flash** (via API).
    - The AI model processes the context to identify core concepts and generate a summary.

4.  **Response Delivery:**
    - The structured summary is returned to the frontend and displayed with Markdown formatting.

---

## 💻 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Lucide React, Axios
- **Backend:** Python 3.10+, FastAPI, Uvicorn
- **AI Engine:** Google Gemini 2.5 Flash API
- **Utilities:** `youtube-transcript-api`, `pypdf`, `python-multipart`

---

## 📦 Setup & Installation

Follow these steps to run the project locally.

### **1. Clone the Repository**
```bash
git clone [https://github.com/Jeevannn11/LearnAI.git](https://github.com/Jeevannn11/LearnAI.git)
cd LearnAI


##2. Backend Setup
cd backend
# Install dependencies
pip install fastapi uvicorn openai youtube-transcript-api pypdf python-multipart

# Add your API Key
# Open main.py and replace "PASTE_YOUR_KEY_HERE" with your actual Google Gemini API Key.

# Run the server
python main.py


##3. Frontend Setup
cd frontend
# Install dependencies
npm install

# Start the React app
npm start

Built with ❤️ by Jeevan Tadwal