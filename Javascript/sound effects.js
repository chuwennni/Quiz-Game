const sfxClick = new Audio("/sfx/click3.mp3");

sfxClick.preload = "auto";

document.addEventListener("click", () => {
  const clone = sfxClick.cloneNode();
  clone.play().catch(() => {
  });
});


