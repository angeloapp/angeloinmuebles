/* amsita.js — Widget Amsita para Angelo Inmuebles
   Usa /api/chat (proxy Vercel) — la API key NUNCA se expone al cliente */
(function () {
  // ─── ESTILOS ───────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #amsita-btn{position:fixed;bottom:28px;right:28px;z-index:9999999;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#b8922a);border:none;cursor:pointer;box-shadow:0 8px 32px rgba(212,175,55,.45);display:flex;align-items:center;justify-content:center;transition:all .3s ease;font-size:26px}
    #amsita-btn:hover{transform:scale(1.1);box-shadow:0 12px 40px rgba(212,175,55,.6)}
    #amsita-btn .amsita-notif{position:absolute;top:-4px;right:-4px;background:#e74c3c;color:#fff;border-radius:50%;width:18px;height:18px;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700}
    #amsita-panel{position:fixed;bottom:100px;right:28px;z-index:9999998;width:370px;max-height:560px;background:linear-gradient(160deg,#0d1117 0%,#12082a 100%);border:1px solid rgba(212,175,55,.25);border-radius:20px;box-shadow:0 24px 80px rgba(0,0,0,.7);display:none;flex-direction:column;overflow:hidden;font-family:'Cormorant Garamond','Georgia',serif}
    #amsita-panel.open{display:flex}
    #amsita-header{background:linear-gradient(90deg,rgba(212,175,55,.15),rgba(212,175,55,.05));padding:16px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(212,175,55,.2)}
    #amsita-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#d4af37,#8b6914);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
    #amsita-info h4{margin:0;color:#d4af37;font-size:1rem;font-weight:600;letter-spacing:.03em}
    #amsita-info p{margin:0;color:rgba(245,237,224,.6);font-size:.75rem;font-family:'Montserrat',sans-serif}
    #amsita-close{margin-left:auto;background:none;border:none;color:rgba(245,237,224,.5);cursor:pointer;font-size:20px;padding:4px;transition:color .2s}
    #amsita-close:hover{color:#d4af37}
    #amsita-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;max-height:360px;scrollbar-width:thin;scrollbar-color:rgba(212,175,55,.3) transparent}
    #amsita-msgs::-webkit-scrollbar{width:4px}
    #amsita-msgs::-webkit-scrollbar-thumb{background:rgba(212,175,55,.3);border-radius:2px}
    .amsita-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:.88rem;line-height:1.6;letter-spacing:.01em}
    .amsita-msg.bot{background:rgba(255,255,255,.06);color:#f5ede0;border:1px solid rgba(212,175,55,.12);align-self:flex-start;border-bottom-left-radius:4px}
    .amsita-msg.user{background:linear-gradient(135deg,rgba(212,175,55,.25),rgba(212,175,55,.12));color:#f5ede0;border:1px solid rgba(212,175,55,.3);align-self:flex-end;border-bottom-right-radius:4px}
    .amsita-typing{display:flex;gap:5px;align-items:center;padding:10px 14px;background:rgba(255,255,255,.06);border:1px solid rgba(212,175,55,.12);border-radius:14px;border-bottom-left-radius:4px;align-self:flex-start;width:56px}
    .amsita-typing span{width:7px;height:7px;border-radius:50%;background:#d4af37;animation:amsitaDot 1.2s infinite}
    .amsita-typing span:nth-child(2){animation-delay:.2s}
    .amsita-typing span:nth-child(3){animation-delay:.4s}
    @keyframes amsitaDot{0%,80%,100%{opacity:.25;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
    #amsita-input-row{display:flex;gap:8px;padding:12px 14px;border-top:1px solid rgba(212,175,55,.15);background:rgba(0,0,0,.2)}
    #amsita-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(212,175,55,.2);border-radius:10px;padding:10px 14px;color:#f5ede0;font-family:'Montserrat',sans-serif;font-size:.85rem;outline:none;resize:none;height:40px;transition:border-color .2s}
    #amsita-input::placeholder{color:rgba(245,237,224,.35)}
    #amsita-input:focus{border-color:rgba(212,175,55,.5)}
    #amsita-send{background:linear-gradient(135deg,#d4af37,#b8922a);border:none;border-radius:10px;width:40px;height:40px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;font-size:16px}
    #amsita-send:hover{transform:scale(1.08)}
    @media(max-width:420px){#amsita-panel{width:calc(100vw - 24px);right:12px}}
  `;
  document.head.appendChild(style);

  // ─── HTML DEL WIDGET ──────────────────────────────────────────
  const html = `
    <div id="amsita-btn" title="Habla con Amsita">🏡<span class="amsita-notif">1</span></div>
    <div id="amsita-panel">
      <div id="amsita-header">
        <div id="amsita-avatar">🤖</div>
        <div id="amsita-info"><h4>Amsita</h4><p>Agente Inmobiliaria &middot; Angelo Inmuebles</p></div>
        <button id="amsita-close">&times;</button>
      </div>
      <div id="amsita-msgs"></div>
      <div id="amsita-input-row">
        <input id="amsita-input" placeholder="Escrí­beme..." />
        <button id="amsita-send">➤</button>
      </div>
    </div>
  `;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  // ─── LÓGICA DEL CHAT ──────────────────────────────────────────
  const SYS = `Eres Amsita, un agente inmobiliario mexicano altamente inteligente, proactivo, amable y experto. Trabajas para Angelo Inmuebles (sell.cabosaintlucas.properties).

Tu misión principal es ayudar a los usuarios a encontrar, evaluar y avanzar en la compra, renta o inversión de propiedades en México, especialmente en Cabo San Lucas, Baja California Sur.

Reglas importantes:
- Siempre habla en español mexicano natural.
- Sé claro, honesto y útil.
- Haz preguntas una por una para no abrumar al usuario.
- Mantén el enfoque en avanzar en el objetivo inmobiliario del usuario.

Tareas específicas:
1. Entender la necesidad: tipo de propiedad, zona, presupuesto, propósito (vivir/rentar/invertir), recámaras, amenidades.
2. Buscar y recomendar propiedades con información clara.
3. Comparar propiedades cuando sea necesario.
4. Ayudar con cálculos: hipoteca, costos de cierre, rentabilidad.
5. Apoyar los siguientes pasos: preparar preguntas para visitas, explicar trámites en México.

Siempre termina ofreciendo el siguiente paso lógico.`;

  const MODEL = 'grok-3-fast-beta';
  let hist = [], started = false;

  const btn   = document.getElementById('amsita-btn');
  const panel = document.getElementById('amsita-panel');
  const close = document.getElementById('amsita-close');
  const input = document.getElementById('amsita-input');
  const send  = document.getElementById('amsita-send');
  const msgs  = document.getElementById('amsita-msgs');

  function toggle() {
    panel.classList.toggle('open');
    const n = btn.querySelector('.amsita-notif');
    if (n) n.remove();
    if (panel.classList.contains('open') && !started) {
      started = true;
      addMsg('bot', '\u00a1Hola! Soy Amsita \ud83d\udc4b tu agente inmobiliaria de Angelo Inmuebles. \u00bfEn qu\u00e9 te puedo ayudar hoy con propiedades?');
    }
  }

  function addMsg(role, text) {
    const d = document.createElement('div');
    d.className = 'amsita-msg ' + role;
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing() {
    const d = document.createElement('div');
    d.className = 'amsita-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }

  async function sendMsg() {
    const txt = input.value.trim();
    if (!txt) return;
    input.value = '';
    addMsg('user', txt);
    hist.push({ role: 'user', content: txt });
    const typ = typing();
    try {
      // Llama al proxy seguro — la API key vive en el servidor
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL,
          systemPrompt: SYS,
          messages: hist,
          max_tokens: 600,
          temperature: 0.7
        })
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Lo siento, hubo un error. Intenta de nuevo.';
      hist.push({ role: 'assistant', content: reply });
      typ.remove();
      addMsg('bot', reply);
    } catch (e) {
      typ.remove();
      addMsg('bot', 'Hubo un problema de conexión. Intenta de nuevo en un momento.');
    }
  }

  btn.addEventListener('click', toggle);
  close.addEventListener('click', toggle);
  send.addEventListener('click', sendMsg);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
  });
})();
