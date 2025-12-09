const book = document.getElementById("book");
const pages = Array.from(document.querySelectorAll(".page"));

let currentIndex = 0; // start on page 1 (index 0)

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  // hide current
  pages[currentIndex].classList.remove("active");

  // update index
  currentIndex = index;

  const page = pages[currentIndex];
  page.classList.add("active");

  // adjust book size for single vs spread
  if (page.classList.contains("single")) {
    book.classList.add("single");
    book.classList.remove("spread");
  } else {
    book.classList.add("spread");
    book.classList.remove("single");
  }
}

// initial page
showPage(currentIndex);

// click left/right half to go prev/next
book.addEventListener("click", (e) => {
  const rect = book.getBoundingClientRect();
  const x = e.clientX - rect.left;

  if (x < rect.width / 2) {
    // left half → previous
    showPage(currentIndex - 1);
  } else {
    // right half → next
    showPage(currentIndex + 1);
  }
});
