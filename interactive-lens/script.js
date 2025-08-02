// Intersection Observer for slide fade-in
const slides = document.querySelectorAll('.slide');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });
slides.forEach(slide => observer.observe(slide));

// Morphing shapes on intro slide
const groups = document.querySelectorAll('#slide-0 svg g');
let idx = 0;
function cycleMorph() {
  groups.forEach((g, i) => g.classList.toggle('active', i === idx));
  idx = (idx + 1) % groups.length;
}
cycleMorph();
setInterval(cycleMorph, 3000);
