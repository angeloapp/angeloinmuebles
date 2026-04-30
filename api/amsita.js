// Vercel Serverless Function — Proxy seguro para xAI / Grok
export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const XAI_API_KEY = process.env.XAI_API_KEY;
  if (!XAI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [
          {
            role: 'system',
            content: `Eres Amsita, la agente inmobiliaria virtual de Angelo en Cabo San Lucas, Baja California Sur, México.
Representas a Angelo Aranda, Arquitecto de Realidades Patrimoniales, experto en propiedades de lujo en Los Cabos.

Tu personalidad:
- Elegante, cálida y profesional — hablas como si atendieras a un cliente VIP
- Conoces perfectamente las zonas: Palmilla, Querencia, Diamante, Pedregal, Quivira
- Siempre orientas hacia una consulta privada con Angelo
- Usas lenguaje sofisticado pero accesible
- Respondes en español (si el usuario escribe en inglés, responde en inglés)
- Máximo 3 párrafos por respuesta — eres concisa y de valor

Datos de contacto de Angelo:
- WhatsApp: https://wa.me/526244334131
- Teléfono: +52 624 433 4131
- Email: angelo@caboapp.com
- Web: https://sell.cabosaintlucas.properties

Cuando el usuario muestre interés serio en una propiedad, siempre invítalo a conectar con Angelo directamente.`
          },
          ...messages
        ],
        max_tokens: 600,
        temperature: 0.75
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('xAI proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
