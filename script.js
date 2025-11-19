// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(navToggle){
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// ===== Smooth scroll for internal links =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      if(nav.classList.contains('show')) nav.classList.remove('show');
    }
  });
});

// ===== IntersectionObserver for section reveal =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){
      en.target.classList.remove('fade-hidden');
      en.target.classList.add('fade-visible');
      io.unobserve(en.target);
    }
  });
},{threshold: 0.15});

document.querySelectorAll('.card, .section, .hero').forEach(el=>{
  el.classList.add('fade-hidden');
  io.observe(el);
});

// ===== Lightbox for all images =====
const clickable = document.querySelectorAll('.clickable');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

clickable.forEach(img=>{
  img.addEventListener('click', ()=>{
    const src = img.getAttribute('data-full') || img.src;
    lightboxImg.src = src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });
});

lightboxClose.addEventListener('click', ()=>{
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
});

lightbox.addEventListener('click', (e)=>{
  if(e.target === lightbox) {
    lightboxClose.click();
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && lightbox.classList.contains('show')){
    lightboxClose.click();
  }
});

// ===== INTERACTIVE SKILLS DEMO =====
function runSkillsDemo() {
  const output = document.getElementById('skillsOutput');
  
  output.innerHTML = `
    <div class="skills-matrix">
      <div class="skill-row">
        <div class="skill-name">HTML/CSS</div>
        <div class="skill-bar-container">
          <div class="skill-bar" id="HTML/CSS" data-width="85"></div>
        </div>
        <div class="skill-percent" id="HTML/CSS-percent">0%</div>
      </div>
      
      <div class="skill-row">
        <div class="skill-name">JavaScript</div>
        <div class="skill-bar-container">
          <div class="skill-bar" id="JavaScript" data-width="70"></div>
        </div>
        <div class="skill-percent" id="JavaScript-percent">0%</div>
      </div>
      
      <div class="skill-row">
        <div class="skill-name">VBA/Excel</div>
        <div class="skill-bar-container">
          <div class="skill-bar" id="VBA/Excel" data-width="80"></div>
        </div>
        <div class="skill-percent" id="VBA/Excel-percent">0%</div>
      </div>
      
      <div class="skill-row">
        <div class="skill-name">Power Tools</div>
        <div class="skill-bar-container">
          <div class="skill-bar" id="Power Tools" data-width="75"></div>
        </div>
        <div class="skill-percent" id="Power Tools-percent">0%</div>
      </div>
      
      <div class="skill-row">
        <div class="skill-name">Adobe Illustrator</div>
        <div class="skill-bar-container">
          <div class="skill-bar" id="Adobe Illustrator" data-width="75"></div>
        </div>
        <div class="skill-percent" id="Adobe Illustrator-percent">0%</div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const skillRows = output.querySelectorAll('.skill-row');
    
    skillRows.forEach((row, index) => {
      setTimeout(() => {
        const bar = row.querySelector('.skill-bar');
        const percent = row.querySelector('.skill-percent');
        const targetWidth = bar.getAttribute('data-width');
        
        bar.style.width = targetWidth + '%';
        
        let current = 0;
        const target = parseInt(targetWidth);
        const duration = 2000;
        const steps = duration / 50;
        const increment = target / steps;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          percent.textContent = Math.round(current) + '%';
        }, 50);
        
      }, index * 400);
    });
  }, 100);
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('Skills section visible - interactive demo ready');
      }
    });
  });
  observer.observe(skillsSection);
}