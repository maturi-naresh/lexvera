import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.agent_response || data.response || 'No response returned.');
    } catch (err) {
      setResponse('Error communicating with AI Agent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Lexavra Infinology - AI Agent Interface</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          placeholder="Ask the self-hosted AI agent something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {loading ? 'Sending...' : 'Send to Agent'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
          <strong>Agent Output:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
