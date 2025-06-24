// Backend endpoint to create Tavus conversations
// Standalone Express.js server using ES modules

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// Load environment variables manually for ES modules
try {
  const envPath = join(dirname(fileURLToPath(import.meta.url)), '..', '.env');
  const envContent = readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  envLines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  console.log('Environment variables loaded successfully');
} catch (error) {
  console.warn('Could not load .env file:', error.message);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'GLOHSEN API Server is running' });
});

// Create conversation endpoint
app.post('/api/create-conversation', async (req, res) => {
  try {
    console.log('Creating Tavus conversation...');
    
    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.TAVUS_API_KEY || '9022a34f7963405193ec9fa5f1cb137e',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "replica_id": "rb17cf590e15",
        "conversation_name": "GLOHSEN Customer Welcome Rep",
        "persona_id": "p99dc6468877",
        "conversational_context": "Clients come to the platform seeking to vent or give feedback on a health service they were rendered at an external hospital, pharmacy or diagnostic center. \nThis feedback will either be directed at a health professional, a health facility/diagnostic center/pharmacy, a tutor on our platform or a workplace where they were injured.\n\nSome clients might be injured, aggrieved and hurting. You are to be empathetic when responding to them, and show sympathy for any unfortunate situation they present to you, or any poor mental health state or depressed emotional state they might be in.\nNever raise your voice or cut them off mid-sentence. Wait your turn patiently. If you are not clear on any question or issue presented, you should ask them to clarify or repeat themselves in order to be on the same page with them on their particular concern.\n\nIf the user is a student, professional, tutor or employer/company representative seeking to recruit talents, welcome them gladly and proceed to direct them appropriately or answer any concerns that they may have.",
        properties: {
          max_call_duration: 1200, // 20 minutes
          participant_absent_timeout: 300, // 5 minutes
          participant_left_timeout: 30 // 30 seconds
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API Error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: `Tavus API Error: ${response.status}`,
        details: errorData 
      });
    }
    
    const conversation = await response.json();
    console.log('Conversation created successfully:', conversation.conversation_id);
    
    // Return the conversation data including the URL
    res.json(conversation);
    
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ 
      error: 'Failed to create conversation',
      details: error.message 
    });  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Endpoint available at: http://localhost:${PORT}/api/create-conversation`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
