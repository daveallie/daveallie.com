import React, { ReactNode, useLayoutEffect, useRef } from 'react';

const { PI, sin, abs, sqrt, pow } = Math;
const randIn = (min: number, max: number) => min + Math.random() * (max - min);
const fadeIn = (t: number, m: number) => t / m;
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m;
  return abs(((t + hm) % m) - hm) / hm;
};
const dist = (x1: number, y1: number, x2: number, y2: number) =>
  sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

export default function FireText({ children }: { children: ReactNode }) {
  const renderTimeout = useRef<number | null>(null);
  const wordRef = useRef<HTMLElement>(null);
  const drawnCanvas = useRef<HTMLCanvasElement>(null);
  const reserveCanvas = useRef<HTMLCanvasElement>(
    document.createElement('canvas')
  );
  const reserveContext = reserveCanvas.current.getContext('2d');
  const center = useRef([0, 0]);
  const particles = useRef<Array<Particle>>([]);

  class Particle {
    hue: number;
    life: number;
    ttl: number;
    speed: number;
    size: number;
    position: [number, number];
    velocity: [number, number];

    constructor() {
      this.life = 0;
      this.ttl = 0;
      this.speed = 0;
      this.size = 0;
      this.position = [0, 0];
      this.velocity = [0, 0];
      this.hue = 0;
      this.init();
    }
    get color() {
      return `hsla(${this.hue}, 50%, 50%, ${fadeInOut(this.life, this.ttl)})`;
    }
    init() {
      this.life = Math.random() * 30;
      this.ttl = randIn(20, 40);
      this.speed = randIn(9, 12);
      this.size = randIn(40, 60);
      this.position = [
        randIn(
          reserveCanvas.current.width * 0.1,
          reserveCanvas.current.width * 0.9
        ),
        center.current[1] + randIn(-10, -30),
      ];
      let direction = -PI / 4;
      this.velocity = [0, sin(direction) * this.speed * 2];
      this.hue = randIn(10, 40);
    }
    checkBounds() {
      const [x, y] = this.position;
      return (
        x > reserveCanvas.current.width ||
        x < 0 ||
        y > reserveCanvas.current.height ||
        y < 0
      );
    }
    update() {
      this.speed =
        fadeIn(
          dist(
            center.current[0],
            center.current[1],
            this.position[0],
            this.position[1]
          ),
          0.5 * reserveCanvas.current.height
        ) * 20;
      this.velocity[1] *= 1.01;
      this.position[0] += this.velocity[0];
      this.position[1] += this.velocity[1];

      (this.checkBounds() || this.life++ > this.ttl) && this.init();

      return this;
    }
    draw() {
      if (reserveContext) {
        reserveContext.save();
        reserveContext.fillStyle = this.color;
        reserveContext.fillRect(
          this.position[0],
          this.position[1],
          this.size,
          this.size * 1.5
        );
        reserveContext.restore();
      }

      return this;
    }
  }

  function setup() {
    reserveCanvas.current.width = drawnCanvas.current!.width =
      ((800 * wordRef.current!.offsetWidth) / wordRef.current!.offsetHeight) *
      2;
    reserveCanvas.current.height = drawnCanvas.current!.height = 800;

    center.current[0] = 0.5 * reserveCanvas.current.width;
    center.current[1] = 0.75 * reserveCanvas.current.height;

    createParticles();
    draw();
  }

  function createParticles() {
    particles.current = [];
    for (let i = 0; i < Math.floor(reserveCanvas.current.width / 15); i++) {
      particles.current.push(new Particle());
    }
  }

  function renderToScreen() {
    const drawnContext = drawnCanvas.current?.getContext('2d');
    if (!drawnContext) {
      return;
    }

    drawnContext.save();
    drawnContext.filter = 'blur(15px)';
    drawnContext.drawImage(reserveCanvas.current, 0, 0);
    drawnContext.restore();

    drawnContext.save();
    drawnContext.filter = 'blur(18px)';
    drawnContext.globalCompositeOperation = 'soft-light';
    drawnContext.drawImage(reserveCanvas.current, 0, 0);
    drawnContext.restore();

    drawnContext.save();
    drawnContext.filter = 'blur(6px)';
    drawnContext.globalCompositeOperation = 'lighter';
    drawnContext.drawImage(reserveCanvas.current, 0, 0);
    drawnContext.restore();
  }

  function draw() {
    const drawnContext = drawnCanvas.current?.getContext('2d');
    if (drawnCanvas.current && drawnContext && reserveContext) {
      reserveContext.clearRect(
        0,
        0,
        reserveCanvas.current.width,
        reserveCanvas.current.height
      );

      reserveContext.save();
      reserveContext.globalAlpha = 0.6;
      reserveContext.drawImage(drawnCanvas.current, 0, 0);
      reserveContext.restore();

      drawnContext.clearRect(
        0,
        0,
        drawnCanvas.current.width,
        drawnCanvas.current.height
      );

      drawnContext.save();
      drawnContext.drawImage(reserveCanvas.current, 0, 0);
      drawnContext.restore();

      reserveContext.clearRect(
        0,
        0,
        reserveCanvas.current.width,
        reserveCanvas.current.height
      );

      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].draw().update();
      }

      renderToScreen();
    }

    renderTimeout.current = window.setTimeout(
      () => window.requestAnimationFrame(draw),
      30
    );
  }

  useLayoutEffect(() => {
    setup();

    return () => {
      if (renderTimeout.current) {
        clearTimeout(renderTimeout.current);
      }
    };
  }, []);

  return (
    <span style={{ position: 'relative' }}>
      <b ref={wordRef}>{children}</b>
      <canvas
        ref={drawnCanvas}
        style={{
          position: 'absolute',
          top: '0',
          left: '-10%',
          width: '120%',
          height: '100%',
          zIndex: -1,
          filter: 'contrast(1.5)',
          transform: 'translateY(-30%)',
        }}
      />
    </span>
  );
}
