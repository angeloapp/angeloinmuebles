// amsita.js — Chat widget de Amsita para sell.cabosaintlucas.properties
// Llama al proxy seguro /api/amsita (Vercel serverless)

let amsitaInitialized = false;
let amsitaHistory = [];

// ─── Toggle panel ───────────────────────────────────────────────────────────
function amsitaToggle() {
  const panel = document.getElementById('amsita-panel');
  const btn   = document.getElementById('amsita-btn');
  if (!panel) return;

  const isOpen = panel.classList.toggle('open');
  btn && btn.setAttribute('aria-expanded', isOpen);

  // Primera apertura → mensaje de bienvenida
  if (isOpen && !amsitaInitialized) {
    amsitaInitialized = true;
    setTimeout(() => {
      amsitaAddMsg('bot',
        '¡Bienvenido! Soy Amsita 🏠 Tu asistente inmobiliaria de Angelo en Cabo San Lucas. ' +
        '¿Buscas terreno, casa o condominio? Cuéntame tu visión y te oriento hacia las mejores opciones.'
      );
    }, 300);
  }

  // Enfocar input al abrir
  if (isOpen) {
    setTimeout(() => {
      const input = document.getElementById('amsita-input');
      input && input.focus();
    }, 400);
  }
}

// ─── Agregar mensaje al chat ─────────────────────────────────────────────────
function amsitaAddMsg(type, text) {
  const msgs = document.getElementById('amsita-msgs');
  if (!msgs) return;

  const div = document.createElement('div');
  div.className = `amsita-msg ${type}`;
  div.textContent = text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

// ─── Indicador de escritura ───────────────────────────────────────────────────
function amsitaShowTyping() {
  const msgs = document.getElementById('amsita-msgs');
  if (!msgs) return;
  const t = document.createElement('div');
  t.className = 'amsita-typing';
  t.id = 'amsita-typing-indicator';
  t.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(t);
  msgs.scrollTop = msgs.scrollHeight;
}

function amsitaHideTyping() {
  document.getElementById('amsita-typing-indicator')?.remove();
}

// ─── Enviar mensaje ───────────────────────────────────────────────────────────
async function amsitaSend() {
  const input = document.getElementById('amsita-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  // Mostrar mensaje del usuario
  amsitaAddMsg('user', text);
  amsitaHistory.push({ role: 'user', content: text });
  input.value = '';

  // Mostrar typing
  amsitaShowTyping();

  // Deshabilitar input mientras espera
  input.disabled = true;
  const sendBtn = document.getElementById('amsita-send');
  if (sendBtn) sendBtn.disabled = true;

  try {
    const res = await fetch('/api/amsita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: amsitaHistory })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content
      || 'Disculpa, no pude procesar tu consulta en este momento. Por favor contáctame por WhatsApp.';

    amsitaHideTyping();
    amsitaAddMsg('bot', reply);
    amsitaHistory.push({ role: 'assistant', content: reply });

  } catch (e) {
    console.error('Amsita error:', e);
    amsitaHideTyping();
    amsitaAddMsg('bot',
      'Hubo un problema de conexión 🙏 Puedes contactar a Angelo directamente por WhatsApp: wa.me/526244334131'
    );
  } finally {
    input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    input.focus();
  }
}

// ─── Enter para enviar ────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('amsita-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        amsitaSend();
      }
    });
  }

  // Cerrar con botón X interno
  const closeBtn = document.getElementById('amsita-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', amsitaToggle);
  }
});
