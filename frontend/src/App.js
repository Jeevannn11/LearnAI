import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Youtube, FileType, Sparkles, Brain, Zap, Target, TrendingUp } from 'lucide-react';

export default function LearnAI() {
  const [activeTab, setActiveTab] = useState('text');
  
  // State for inputs
  const [textContent, setTextContent] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  
  // State for logic
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    setResult('');
    
    try {
      let response;
      const baseUrl = 'http://localhost:8000'; // Make sure Python is running here

      if (activeTab === 'text') {
        if (!textContent) return alert("Please enter some text!");
        response = await axios.post(`${baseUrl}/summarize_text`, { text: textContent });
      } 
      else if (activeTab === 'youtube') {
        if (!youtubeUrl) return alert("Please enter a YouTube URL!");
        response = await axios.post(`${baseUrl}/summarize_youtube`, { url: youtubeUrl });
      } 
      else if (activeTab === 'pdf') {
        if (!pdfFile) return alert("Please select a PDF file!");
        const formData = new FormData();
        formData.append('file', pdfFile);
        response = await axios.post(`${baseUrl}/summarize_pdf`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setResult(response.data.summary);
    } catch (error) {
      console.error(error);
      setResult("Error: Something went wrong. Make sure the backend is running!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans text-slate-200">
      {/* Sophisticated background with grid */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-60"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Information Section */}
        <div className="w-2/5 flex flex-col justify-center px-16 py-20 hidden lg:flex">
          <div className="space-y-8">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-80"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 p-4 rounded-2xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LearnAI
                </h1>
              </div>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>

            {/* Main Description */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Transform Your Learning<br />
                <span className="text-gray-400">with AI-Powered Summaries</span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                Experience the future of studying with our advanced AI technology. LearnAI analyzes your content and generates comprehensive, easy-to-understand summaries in seconds.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Lightning Fast Processing</h3>
                  <p className="text-gray-500 text-sm">Get summaries in under 10 seconds, no matter the content length</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Precision Accuracy</h3>
                  <p className="text-gray-500 text-sm">AI-powered algorithms ensure key points are never missed</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="mt-1 p-2 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Boost Productivity</h3>
                  <p className="text-gray-500 text-sm">Save hours of reading time and focus on what matters</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10+</div>
                <div className="text-gray-500 text-sm">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">1M+</div>
                <div className="text-gray-500 text-sm">Summaries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-gray-500 text-sm">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Interactive Section */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-8 lg:px-16 py-20 overflow-y-auto">
          <div className="w-full max-w-3xl">
            {/* Main Card */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
              {/* Card glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              
              <div className="relative p-10">
                {/* Tab Navigation */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <button
                    onClick={() => setActiveTab('text')}
                    className={`relative flex flex-col items-center gap-3 px-6 py-6 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === 'text'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl shadow-blue-500/50 scale-105'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                  >
                    <FileText className="w-8 h-8" />
                    <span className="text-sm">Text Notes</span>
                    {activeTab === 'text' && (
                      <div className="absolute inset-0 rounded-2xl bg-blue-400 blur-2xl opacity-40 -z-10"></div>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('youtube')}
                    className={`relative flex flex-col items-center gap-3 px-6 py-6 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === 'youtube'
                        ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-2xl shadow-red-500/50 scale-105'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                  >
                    <Youtube className="w-8 h-8" />
                    <span className="text-sm">YouTube</span>
                    {activeTab === 'youtube' && (
                      <div className="absolute inset-0 rounded-2xl bg-red-400 blur-2xl opacity-40 -z-10"></div>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('pdf')}
                    className={`relative flex flex-col items-center gap-3 px-6 py-6 rounded-2xl font-semibold transition-all duration-300 ${
                      activeTab === 'pdf'
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-2xl shadow-purple-500/50 scale-105'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
                    }`}
                  >
                    <FileType className="w-8 h-8" />
                    <span className="text-sm">PDF File</span>
                    {activeTab === 'pdf' && (
                      <div className="absolute inset-0 rounded-2xl bg-purple-400 blur-2xl opacity-40 -z-10"></div>
                    )}
                  </button>
                </div>

                {/* Content Area */}
                <div className="mb-8">
                  {activeTab === 'text' && (
                    <div className="space-y-3">
                      <label className="text-gray-400 text-sm font-medium">Paste your content below</label>
                      <textarea
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        placeholder="Paste your lecture notes, articles, or any text content here..."
                        className="w-full h-80 px-6 py-5 bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 text-base leading-relaxed"
                      />
                    </div>
                  )}

                  {activeTab === 'youtube' && (
                    <div className="space-y-4">
                      <label className="text-gray-400 text-sm font-medium">Enter YouTube video URL</label>
                      <input
                        type="text"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-6 py-5 bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 text-base"
                      />
                      <div className="h-72 bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-500/10 rounded-full mb-4">
                            <Youtube className="w-12 h-12 text-red-500" />
                          </div>
                          <p className="text-gray-400 text-base mb-2">Video Transcript Analysis</p>
                          <p className="text-gray-600 text-sm">Paste a URL to extract and summarize the video content</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'pdf' && (
                    <div className="space-y-3">
                      <label className="text-gray-400 text-sm font-medium">Upload PDF document</label>
                      <div className="relative h-80 bg-black/40 backdrop-blur-sm border-2 border-dashed border-gray-700 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-black/60 hover:border-purple-500/50 transition-all duration-300 group">
                        <input 
                           type="file"
                           accept=".pdf"
                           onChange={(e) => setPdfFile(e.target.files[0])}
                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="text-center">
                          <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-purple-500/10 rounded-full">
                              <FileType className="w-12 h-12 text-purple-400" />
                            </div>
                          </div>
                          <p className="text-gray-300 font-semibold text-lg mb-2">
                            {pdfFile ? `Selected: ${pdfFile.name}` : "Drop your PDF here"}
                          </p>
                          <p className="text-gray-500 text-sm mb-4">or click to browse files</p>
                          <p className="text-gray-600 text-xs">Supports PDF up to 50MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <button 
                  onClick={handleSummarize}
                  disabled={loading}
                  className="group relative w-full py-6 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  
                  <span className="relative flex items-center justify-center gap-3 text-white">
                    <Sparkles className="w-6 h-6" />
                    {loading ? 'Thinking... 🧠' : 'Generate AI Summary'}
                    <Sparkles className="w-6 h-6" />
                  </span>
                </button>

                {/* Info text */}
                <p className="text-center text-gray-500 text-xs mt-6">
                  Processing time: ~5-10 seconds • Powered by Google Gemini
                </p>

                {/* RESULTS DISPLAY SECTION (Added) */}
                {result && (
                  <div className="mt-8 p-6 bg-black/50 rounded-2xl border border-gray-700 animate-fade-in">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                      ✨ AI Summary:
                    </h3>
                    <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {result}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom info cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">Fast</div>
                <div className="text-gray-500 text-xs">10s Processing</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">Smart</div>
                <div className="text-gray-500 text-xs">AI-Powered</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-pink-400 mb-1">Secure</div>
                <div className="text-gray-500 text-xs">Private Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}