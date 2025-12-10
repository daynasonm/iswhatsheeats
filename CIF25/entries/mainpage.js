// Emoji cursor follow
const emojiCursor = document.getElementById('emoji-cursor');

window.addEventListener('mousemove', (e) => {
  emojiCursor.style.left = e.clientX + 'px';
  emojiCursor.style.top  = e.clientY + 'px';
});
