const express = require('express');
const router = express.Router();

// Fallback responses for common stress-related messages
const fallbackResponses = {
  'i am stressed|i feel stressed|stressed|stress': 
    "I hear you. Stress can be overwhelming, but remember you're not alone. Here are some things that might help:\n\n1. Take a deep breath - Try our breathing exercises for 5 minutes\n2. Pause and reflect - Ask yourself what's causing this stress\n3. Move your body - Even a short walk can help reduce stress hormones\n4. Connect with someone - Talk to a friend or family member\n5. Practice self-care - Take time for something you enjoy\n\nWould you like to try a breathing exercise?",
  
  'i feel anxious|anxious|anxiety|worried|worry': 
    "Anxiety can feel really challenging. Try grounding yourself - Notice 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This can help bring you back to the present moment.\n\nAlso, box breathing can help: Breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat 5-10 times.",
  
  'i cannot sleep|cannot sleep|insomnia|can\'t sleep': 
    "Sleep troubles can be really frustrating. Try a consistent sleep schedule, avoid screens before bed, keep your room cool (around 65-68°F), and try relaxation techniques like deep breathing or progressive muscle relaxation.\n\nOur Music Therapy feature has helpful sleep playlists. Would you like to explore that?",
  
  'i am overwhelmed|overwhelmed|too much|overload': 
    "Feeling overwhelmed is a sign you might need to slow down. Try this: Stop and take 5 deep breaths, write down everything on your mind (brain dump), then pick just 3 things that matter most today. Take breaks every 25 minutes.\n\nRemember: one task at a time.",
  
  'how can i relax|relax|relaxation|calm': 
    "Great question! Try: breathing exercises, calming music, progressive muscle relaxation, meditation, physical activity like yoga, or a hobby you enjoy. Our app has tools for all of these. What sounds most appealing to you?",
  
  'breathing exercise|teach me to breathe': 
    "Try the 4-4-6 breathing exercise: Breathe in through your nose for 4 counts, hold for 4 counts, then exhale slowly for 6 counts. Pause for 2 counts and repeat 5-10 times.\n\nFor interactive guidance with a visual circle, visit our Breathing page!"
};

// Try to load OpenAI client if API key is available
let openai = null;
if (process.env.OPENAI_API_KEY) {
  try {
    const OpenAI = require('openai');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.warn('OpenAI not initialized:', error.message);
  }
}

// Helper function to get fallback response
const getFallbackResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  for (const [pattern, response] of Object.entries(fallbackResponses)) {
    const patterns = pattern.split('|');
    if (patterns.some(p => lowerMessage.includes(p.trim()))) {
      return response;
    }
  }
  
  // Default response if no pattern matches
  return "Thank you for sharing. That sounds important. Would you like to try one of our tools? We have breathing exercises, music therapy, a diary for reflection, or stress analysis. What would help you most right now?";
};

// POST /api/chatbot/message
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Try to use OpenAI API if available
    if (openai) {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'You are a helpful AI assistant for stress management and mental health support. Provide empathetic, supportive responses. Do not claim to diagnose medical conditions. If someone expresses crisis or danger, suggest seeking immediate professional help.' 
            },
            { role: 'user', content: message },
          ],
          max_tokens: 300,
        });

        const reply = completion.choices[0].message.content;
        return res.json({ reply });
      } catch (apiError) {
        console.warn('OpenAI API error, using fallback:', apiError.message);
        // Fall through to fallback response
      }
    }

    // Use fallback response
    const reply = getFallbackResponse(message);
    res.json({ reply });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      reply: getFallbackResponse(req.body.message || '')
    });
  }
});

module.exports = router;
