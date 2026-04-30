// api/chat.js — Vercel Serverless Function
// Proxy seguro para xAI / Grok API
// La API key NUNCA sale al cliente; se lee desde variables de entorno de Vercel.

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Leer la API key desde la variable de entorno de Vercel
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'XAI_API_KEY no configurada. Agrégala en Vercel → Settings → Environment Variables.'
    });
  }

  try {
    const { messages, model, systemPrompt } = req.body;

    // Construir el array de mensajes
    const finalMessages = [];
    if (systemPrompt) {
      finalMessages.push({ role: 'system', content: systemPrompt });
    }
    if (Array.isArray(messages)) {
      finalMessages.push(...messages);
    }

    // Llamar a la API de xAI
    const xaiResponse = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model || 'grok-3-mini',
        messages: finalMessages,
        stream: false,
      }),
    });

    const data = await xaiResponse.json();

    if (!xaiResponse.ok) {
      return res.status(xaiResponse.status).json({ error: data });
    }

    // Headers CORS para que tu frontend pueda llamarlo
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
