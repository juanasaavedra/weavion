// Intersection Observer for slides
const slides = document.querySelectorAll('.slide');
const options = { threshold: 0.4 };
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, options);
slides.forEach(s => obs.observe(s));

// Morphing shapes in intro
const morphShapes = document.querySelectorAll('#morph-wrapper .morph-shape');
let morphIndex = 0;
function cycleMorph() {
  morphShapes.forEach(s => s.classList.remove('active'));
  morphShapes[morphIndex % morphShapes.length].classList.add('active');
  morphIndex++;
}
cycleMorph();
setInterval(cycleMorph, 3000);

// Lens movement and highlight logic
const lens = document.getElementById('lens');
let activeShape = null;

function moveLens(e) {
  const x = e.clientX - lens.offsetWidth / 2;
  const y = e.clientY - lens.offsetHeight / 2;
  lens.style.transform = `translate(${x}px, ${y}px)`;
  const el = document.elementFromPoint(e.clientX, e.clientY);
  if (el && el.classList.contains('shape')) {
    if (activeShape && activeShape !== el) {
      activeShape.classList.remove('highlight');
    }
    activeShape = el;
    activeShape.classList.add('highlight');
  } else if (activeShape) {
    activeShape.classList.remove('highlight');
    activeShape = null;
  }
}

document.addEventListener('pointermove', moveLens);

document.addEventListener('pointerdown', (e) => {
  moveLens(e);
});

document.addEventListener('pointerleave', () => {
  lens.style.transform = 'translate(-1000px, -1000px)';
  if (activeShape) {
    activeShape.classList.remove('highlight');
    activeShape = null;
  }
});
