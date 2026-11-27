const map = document.querySelector<HTMLElement>('.course-atlas');
if (map) initialize(map);

function initialize(map: HTMLElement) {
  const viewport = map.querySelector<HTMLElement>('.atlas-viewport')!;
  const surface = map.querySelector<HTMLElement>('.atlas-surface')!;
  const plane = map.querySelector<HTMLElement>('.atlas-plane')!;
  const output = map.querySelector<HTMLOutputElement>('[data-scale]')!;
  const picker = map.querySelector<HTMLSelectElement>('[data-course-picker]')!;
  const nodes = [...plane.querySelectorAll<HTMLButtonElement>('[data-code]')];
  const wires = [...plane.querySelectorAll<SVGPathElement>('path[data-from]')];
  const details = map.parentElement!.querySelectorAll<HTMLElement>('[data-detail]');
  let scale = 1;

  function select(code: string) {
    picker.value = code;
    const connected = new Set([code]);
    for (const wire of wires) {
      const { from, to } = wire.dataset;
      const active = from === code || to === code;
      wire.classList.toggle('active', active);
      if (active && from && to) {
        connected.add(from);
        connected.add(to);
        wire.parentElement?.append(wire);
      }
    }
    for (const node of nodes) {
      node.setAttribute('aria-pressed', String(node.dataset['code'] === code));
      node.classList.toggle('connected', connected.has(node.dataset['code']!));
    }
    for (const detail of details) detail.hidden = detail.dataset['detail'] !== code;
  }

  function zoom(next: number, x = viewport.clientWidth / 2, y = viewport.clientHeight / 2) {
    const previous = scale;
    scale = Math.min(2.4, Math.max(0.22, next));
    const left = (viewport.scrollLeft + x) * scale / previous - x;
    const top = (viewport.scrollTop + y) * scale / previous - y;
    plane.style.transform = `scale(${scale})`;
    surface.style.width = plane.offsetWidth * scale + 'px';
    surface.style.height = plane.offsetHeight * scale + 'px';
    viewport.scrollTo(left, top);
    output.value = Math.round(scale * 100) + '%';
  }

  picker.addEventListener('change', () => {
    select(picker.value);
    const node = nodes.find(n => n.dataset['code'] === picker.value);
    if (node) viewport.scrollTo((node.offsetLeft + node.offsetWidth / 2) * scale - viewport.clientWidth / 2,
      (node.offsetTop + node.offsetHeight / 2) * scale - viewport.clientHeight / 2);
  });
  for (const node of nodes) node.addEventListener('click', () => select(node.dataset['code']!));
  for (const button of map.querySelectorAll<HTMLButtonElement>('[data-zoom]')) {
    button.addEventListener('click', () => {
      const action = button.dataset['zoom'];
      if (action === 'fit') {
        zoom(Math.min(viewport.clientWidth / plane.offsetWidth, viewport.clientHeight / plane.offsetHeight), 0, 0);
        viewport.scrollTo(0, 0);
      } else zoom(action === 'in' ? scale * 1.25 : scale / 1.25);
    });
  }
  viewport.addEventListener('wheel', event => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const box = viewport.getBoundingClientRect();
    zoom(scale * Math.exp(-event.deltaY * 0.008), event.clientX - box.left, event.clientY - box.top);
  }, { passive: false });

  let drag: { x: number; y: number; left: number; top: number } | undefined;
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0 || (event.target as Element).closest('button')) return;
    drag = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (drag) viewport.scrollTo(drag.left + drag.x - event.clientX, drag.top + drag.y - event.clientY);
  });
  viewport.addEventListener('lostpointercapture', () => {
    drag = undefined;
    viewport.classList.remove('dragging');
  });
  select(picker.value);
  zoom(Math.max(0.9, Math.min(1, viewport.clientWidth / plane.offsetWidth)), 0, 0);
}
