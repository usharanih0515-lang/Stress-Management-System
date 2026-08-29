import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chatbot.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm your stress management assistant. How are you feeling today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get context-aware response for common stress-related messages
  const getContextualResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      'i am stressed|i feel stressed|stressed|stress': 
        "I hear you. Stress can be overwhelming, but remember you're not alone. Here are some things that might help:\n\n1. **Take a deep breath** - Try our breathing exercises for 5 minutes\n2. **Pause and reflect** - Ask yourself what's causing this stress\n3. **Move your body** - Even a short walk can help reduce stress hormones\n4. **Connect with someone** - Talk to a friend or family member\n5. **Practice self-care** - Take time for something you enjoy\n\nWould you like to try a breathing exercise or would you like to talk more about what's stressing you?",
      
      'i feel anxious|anxious|anxiety|worried|worry': 
        "Anxiety can feel really challenging. Here's what might help:\n\n1. **Ground yourself** - Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n2. **Progressive relaxation** - Tense and release each muscle group\n3. **Box breathing** - Breathe in for 4 counts, hold for 4, out for 4, hold for 4\n4. **Limit caffeine** - It can increase anxiety symptoms\n5. **Accept the feeling** - Anxiety often passes when we stop fighting it\n\nTry our breathing exercise or listening to calming music. Would either help?",
      
      'i cannot sleep|cannot sleep|insomnia|can\'t sleep': 
        "Sleep troubles can be really frustrating. Let me suggest some evidence-based approaches:\n\n1. **Establish a routine** - Go to bed at the same time each night\n2. **Avoid screens** - Blue light suppresses melatonin production\n3. **Try relaxation** - Deep breathing, progressive muscle relaxation, or meditation\n4. **Create a cool environment** - 65-68°F (18-20°C) is ideal\n5. **Journal worries** - Write down concerns to release them from your mind\n6. **Use soothing sounds** - Try our Music Therapy feature\n\nWould you like to explore our Music Therapy or try a relaxing breathing exercise?",
      
      'i am overwhelmed|overwhelmed|too much|overload': 
        "Feeling overwhelmed is a sign you might need to slow down and break things into manageable pieces. Try this:\n\n1. **Pause everything** - Stop and take 5 deep breaths\n2. **Brain dump** - Write down everything on your mind\n3. **Prioritize** - Pick just 3 things that matter most today\n4. **Take breaks** - Step away every 25 minutes (Pomodoro technique)\n5. **Ask for help** - It's okay to delegate or ask others for support\n6. **Practice saying no** - You can't do everything\n\nRemember: one task at a time. What's your most important task right now?",
      
      'how can i relax|relax|relaxation|calm': 
        "Great question! Here are some proven relaxation techniques:\n\n1. **Breathing exercises** - Try our guided breathing patterns\n2. **Music therapy** - Listen to calming, nature-based sounds\n3. **Progressive muscle relaxation** - Tense and release muscle groups\n4. **Meditation or mindfulness** - Focus on the present moment\n5. **Physical activity** - Yoga, walking, or gentle stretching\n6. **Hobbies** - Do something you enjoy\n7. **Nature** - Spend time outdoors if possible\n\nWhich of these sounds most appealing to you? I can guide you through breathing exercises or help you explore other options.",
      
      'give me a breathing exercise|breathing exercise|teach me to breathe|breathing': 
        "Absolutely! Let me guide you through a simple 4-4-6 breathing exercise (also called Box Breathing):\n\n📍 **Find a comfortable position**\n📍 **Close your eyes if you like**\n\n**Follow this pattern:**\n1. Breathe in slowly through your nose for 4 counts\n2. Hold the breath for 4 counts\n3. Exhale slowly through your mouth for 6 counts\n4. Pause for 2 counts\n\n**Repeat 5-10 times**\n\nThis exercise:\n✓ Activates your calming nervous system\n✓ Lowers heart rate and blood pressure\n✓ Takes just 5 minutes\n\nFor more interactive guidance, visit our **Breathing** page where you'll see an animated circle to follow!\n\nReady to try it now?",
    };

    // Check which response matches the user message
    for (const [pattern, response] of Object.entries(responses)) {
      const patterns = pattern.split('|');
      if (patterns.some(p => lowerMessage.includes(p.trim()))) {
        return response;
      }
    }

    return null;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // First try to get context-aware response
      const contextResponse = getContextualResponse(input);
      
      if (contextResponse) {
        // Use local contextual response
        const botMessage = { text: contextResponse, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Try API call for other messages
        try {
          const response = await axios.post(`${API_BASE_URL}/api/chatbot/message`, { message: input });
          const botMessage = { text: response.data.reply, sender: 'bot' };
          setMessages((prev) => [...prev, botMessage]);
        } catch (apiError) {
          // Fallback if API fails
          console.error('API Error:', apiError);
          const fallbackMessage = {
            text: "I'm having trouble connecting to my AI service right now, but I'm here to help! Feel free to tell me more about what you're experiencing, or try visiting one of our tools:\n\n🧘 **Breathing** - Guided breathing exercises\n🎵 **Music Therapy** - Calming sounds\n📝 **Diary** - Reflect on your feelings\n📊 **Analytics** - Track your progress\n\nWhat would help you most right now?",
            sender: 'bot'
          };
          setMessages((prev) => [...prev, fallbackMessage]);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: "I apologize for the difficulty. Please try again or visit our other tools for support.",
        sender: 'bot'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex flex-col">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">AI Support Assistant</h1>
              <p className="text-gray-600 mt-2">Your companion for stress management</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col flex-1 overflow-hidden">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-teal-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tell me how you're feeling..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-semibold transition flex items-center gap-2"
              >
                <span>Send</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Press Enter or click Send. This is not a substitute for professional mental health support.</p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 text-sm text-gray-600">
          <p className="font-semibold text-gray-900 mb-2">💡 Try saying:</p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setInput("I feel stressed")} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-xs">I feel stressed</button>
            <button onClick={() => setInput("I cannot sleep")} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-xs">I cannot sleep</button>
            <button onClick={() => setInput("Give me a breathing exercise")} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-xs">Breathing exercise</button>
            <button onClick={() => setInput("How can I relax?")} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-xs">How can I relax?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
