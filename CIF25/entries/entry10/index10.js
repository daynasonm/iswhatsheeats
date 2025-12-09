// Define an array of color classes
const colorClasses = ['color-1', 'color-2', 'color-3', 'color-4'];

const notes = document.querySelectorAll('.note');

notes.forEach(note => {
  // Start with a random color
  let currentColorIndex = Math.floor(Math.random() * colorClasses.length);
  note.classList.add(colorClasses[currentColorIndex]);

  note.addEventListener('click', () => {
    // Remove current color
    note.classList.remove(colorClasses[currentColorIndex]);

    // Update to next color
    currentColorIndex = (currentColorIndex + 1) % colorClasses.length;
    note.classList.add(colorClasses[currentColorIndex]);
  });
});
