let timeout = NaN;  // putting my nan on timeout (she's been naughty)

window.addEventListener('keydown', resetTimer); // when you press a key
window.addEventListener('pointermove', resetTimer); // or move the mouse

function resetTimer() {
  clearTimeout(timeout); // stop the last timer from resetting
  timeout = window.setTimeout(refresh, 10 * 60 * 1000); // and start a new one
}

function refresh() {
  document.location.reload(); // this refreshes the page 
}