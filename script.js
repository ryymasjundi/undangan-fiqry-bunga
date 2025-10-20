// Config
const CONFIG = {
  couple: 'Fiqry & Bunga',
  dateISO: '2026-06-06T10:00:00+07:00',
  venue: 'Gedung Serbaguna Cikal Harapan',
  address: 'Gedung Serbaguna Cikal Harapan, Citra Indah City, Jonggol',
  heroImage: 'https://drive.google.com/uc?export=view&id=1nxdg2b3mHRgY5__8oJZqeSJXIRybQ14_',
  gallery: [
    'https://drive.google.com/uc?export=view&id=1nxdg2b3mHRgY5__8oJZqeSJXIRybQ14_',
    'https://drive.google.com/uc?export=view&id=1_2zIz8sLgK_tEgRBRAxorNPlfice8NHz',
    'https://drive.google.com/uc?export=view&id=1BcSiDZ8vOssdFtgEYXubQs7zrFaadCMh'
  ],
  spreadsheetIntegration: false // placeholder - set to true and provide endpoint to enable
};

// Apply basic DOM changes
document.addEventListener('DOMContentLoaded', ()=>{
  // Cover open
  const cover = document.getElementById('cover');
  const app = document.getElementById('app');
  const openBtn = document.getElementById('openBtn');
  openBtn.addEventListener('click', ()=>{ cover.style.display='none'; app.classList.remove('hidden'); startCountdown(CONFIG.dateISO); });

  // Hero image + texts
  const heroImg = document.getElementById('heroImg');
  heroImg.src = CONFIG.heroImage;
  document.querySelector('.couple') && (document.querySelector('.couple').textContent = CONFIG.couple);

  // gallery
  const g = document.getElementById('gallery'); if(g){ g.innerHTML=''; CONFIG.gallery.forEach(u=>{ const i=document.createElement('img'); i.src=u; g.appendChild(i); }); }

  // parse ?to=Name
  function getQueryParam(name){ const params = new URLSearchParams(location.search); return params.get(name); }
  const guestParam = getQueryParam('to') || getQueryParam('name') || getQueryParam('guest');
  if(guestParam){
    const guestName = decodeURIComponent(guestParam.replace(/\+/g,' '));
    const guestLine = document.getElementById('guestName'); if(guestLine) guestLine.value = guestName;
  }

  // RSVP simple localStorage
  const form = document.getElementById('rsvpForm');
  if(form){
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const count = document.getElementById('guestCount').value;
      const msg = document.getElementById('guestMsg').value.trim();
      if(!name){ alert('Mohon isi nama.'); return; }
      const key = 'rsvp_'+name.replace(/\s+/g,'_');
      const data = {name, count, msg, ts: new Date().toISOString()};
      localStorage.setItem(key, JSON.stringify(data));
      document.getElementById('rsvpResult').style.display='block';
    });
  }

  // add to calendar
  const addCal = document.getElementById('addCal');
  if(addCal){
    addCal.addEventListener('click', ()=>{
      const start = new Date(CONFIG.dateISO);
      const end = new Date(CONFIG.dateISO); end.setHours(end.getHours()+3);
      function toICSDate(d){ return d.toISOString().replace(/-|:|\.\d+/g,''); }
      const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//FiqryBunga//EN\nBEGIN:VEVENT\nUID:${Date.now()}@fiqrybunga\nDTSTAMP:${toICSDate(new Date())}\nDTSTART:${toICSDate(start)}\nDTEND:${toICSDate(end)}\nSUMMARY:Pernikahan ${CONFIG.couple}\nLOCATION:${CONFIG.venue} - ${CONFIG.address}\nEND:VEVENT\nEND:VCALENDAR`;
      const blob = new Blob([ics],{type:'text/calendar'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href=url; a.download='undangan_fiqry_bunga.ics'; a.click();
      URL.revokeObjectURL(url);
    });
  }
});

// Countdown (separate so it can be started also on page load if needed)
function startCountdown(iso){
  const end = new Date(iso);
  function tick(){
    const now = new Date();
    let diff = Math.max(0, end - now);
    const days = Math.floor(diff/86400000); diff%=86400000;
    const hours = Math.floor(diff/3600000); diff%=3600000;
    const minutes = Math.floor(diff/60000); const seconds = Math.floor((diff%60000)/1000);
    document.getElementById('d').textContent = String(days).padStart(2,'0');
    document.getElementById('h').textContent = String(hours).padStart(2,'0');
    document.getElementById('m').textContent = String(minutes).padStart(2,'0');
    document.getElementById('s').textContent = String(seconds).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);
}
