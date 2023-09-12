/*
Particles moving effect is inspired by this
example: https://codepen.io/soulwire/pen/DdGRYG
*/

const imgUrl = './imgs/hasan.jpg';


const size = { width: 366, height: 480 };

const dummyCanvas = document.createElement('canvas');
dummyCanvas.classList.add('hidden');
dummyCanvas.width = size.width * 2;
dummyCanvas.height = size.height * 2;
const dummyCtx = dummyCanvas.getContext('2d');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = size.width * 2;
ctx.canvas.height = size.height * 2;
canvas.setAttribute('width', size.width);
canvas.setAttribute('height', size.height);

const img = new Image();

let mouse = { x: Infinity, y: Infinity };
let particles = [];

const initParticles = () => {
  dummyCtx.drawImage(img, 0, 0, size.width, size.height);

  const imageData = dummyCtx.getImageData(0, 0, size.width, size.height);
  const data = new Uint8ClampedArray(imageData.data);
  const { length } = data;

  for (let i = 0; i < length; i += 4) {
    particles.push({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3]
    });
  }
  for (let j = 0; j < size.height; j += 1) {
    for (let i = 0; i < size.width; i += 1) {
      const index = j * size.width + i;
      particles[index].x = i;
      particles[index].x0 = i;
      particles[index].vx = 0;
      particles[index].y = j;
      particles[index].y0 = j;
      particles[index].vy = 0;
    }
  }
  particles = particles.filter((p) => p.x % 3 === 0 && p.y % 3 === 0);

  dummyCtx.clearRect(0, 0, size.width, size.height);
};

const calculate = () => {
  for (i = 0; i < particles.length; i++) {
    const p = particles[i];

    const dx = mouse.x - p.x;
    const dy = mouse.y - p.y;
    const d = dx * dx + dy * dy;

    const forceDist = 20000;
    const dragValue = 0.85;
    const easingValue = 0.5;
    const force = forceDist / d;

    if (d < forceDist) {
      const t = Math.atan2(dy, dx);
      p.vx -= force * Math.cos(t);
      p.vy -= force * Math.sin(t);
    }
    p.vx *= dragValue;
    p.vy *= dragValue;

    p.x += p.vx + (p.x0 - p.x) * easingValue;
    p.y += p.vy + (p.y0 - p.y) * easingValue;
  }
}

const updateParticles = () => {
  calculate();
  
  ctx.clearRect(0, 0, size.width, size.height);
  particles.forEach((p, index) => {
    ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
    ctx.fillRect(p.x, p.y, 2, 2);
  });
  
  requestAnimationFrame(updateParticles);
}

img.setAttribute('crossOrigin', '');
img.src = `${imgUrl}?${new Date().getTime()}`;
img.onload = () => {
  initParticles();
  updateParticles();
};

const body = document.querySelector('body');
const onMove = (e) => {
  const bounds = canvas.getBoundingClientRect();
  const x = e && (e.clientX || e.touches?.length)
    ? (e.clientX || e.touches[0].clientX) - bounds.x
    : Infinity;
  const y = e
    ? (e.clientY || e.touches[0].clientY) - bounds.y
    : Infinity;

  mouse = { x, y };
};
body.addEventListener('mousemove', onMove);
body.addEventListener('touchmove', onMove);
body.addEventListener('mouseleave', () => onMove());
body.addEventListener('touchend', () => onMove());
