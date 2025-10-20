// ambil elemen
const openBtn = document.getElementById("openInvitation");
const openingScreen = document.getElementById("openingScreen");
const content = document.getElementById("content");

// musik autoplay setelah tombol diklik
const music = new Audio("assets/music.mp3");
music.loop = true;
// === Pause music saat tab tidak aktif ===
document.addEventListener("visibilitychange", function() {
  const music = document.getElementById("music");
  if (document.hidden) {
    music.pause();
  } else {
    music.play();
  }
});


// nama tamu dari URL ?to=Nama
const params = new URLSearchParams(window.location.search);
const guestName = params.get("to") || "Tamu Undangan";
document.getElementById("guestName").innerHTML = `Kepada Yth.<br>${guestName}`;

// buka undangan
openBtn.addEventListener("click", () => {
  openingScreen.classList.add("fade-out");

  setTimeout(() => {
    openingScreen.style.display = "none";
    content.style.display = "block";
    music.play().catch(err => console.log("Autoplay blocked:", err));
  }, 1000);
});
