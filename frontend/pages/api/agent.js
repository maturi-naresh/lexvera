export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    // Send server-to-server request to n8n webhook
    const response = await fetch('http://43.205.211.184:5678/webhook/ai-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Proxy Error:", error);
    return res.status(500).json({ error: "Failed to communicate with n8n workflow" });
  }
}
