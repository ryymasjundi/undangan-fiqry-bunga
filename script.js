```javascript
const music = document.getElementById("music");

function openInvite() {
  document.getElementById("opening").style.display = "none";
  document.getElementById("content").style.display = "block";

  // fade in music
  music.volume = 0;
  music.play();

  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 1) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 200);

  AOS.init();
}

// pause saat tab pindah
document.addEventListener("visibilitychange", () => {
  if (document.hidden) music.pause();
  else music.play();
});

/* =========================
   GOOGLE SHEETS INTEGRATION
   ========================= */

const scriptURL = "ISI_URL_WEB_APP_KAMU";

function kirimRSVP() {
  const data = {
    nama: document.getElementById("nama").value,
    hadir: document.getElementById("hadir").value,
    pesan: document.getElementById("pesan").value
  };

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => alert("Terkirim!"))
  .catch(() => alert("Gagal kirim"));
}
```
