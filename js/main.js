  const header = document.querySelector('header.site');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const scrim = document.getElementById('scrim');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    scrim.classList.toggle('show', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  scrim.addEventListener('click', () => setMenu(false));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  const form = document.getElementById('enquiry');
  const ok = document.getElementById('formOk');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()){ form.reportValidity(); return; }
    ok.classList.add('show');
    form.querySelectorAll('input,textarea,select').forEach(f => f.value='');
    ok.scrollIntoView({behavior:'smooth', block:'center'});
  });
