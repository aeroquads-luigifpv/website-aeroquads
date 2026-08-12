/* =====================================================
   aeroquads — Shared Script
   Läuft auf allen Seiten (Deutsch & Englisch); prüft, ob Elemente existieren.
   Die Sprache wird aus <html lang="de|en"> gelesen — steuert, welche
   Datensätze unten (Flotte, Projekte, Team) angezeigt werden.
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const LANG = document.documentElement.lang === 'de' ? 'de' : 'en';

  /* ---------- Jahr + Copyright im Footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    const rights = LANG === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.';
    yearEl.textContent = '© ' + new Date().getFullYear() + ' aeroquads. ' + rights;
  }

  /* ---------- Mobile-Menü ---------- */
  const burger = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  /* =====================================================
     AIRCRAFT-DATEN — hier Drohnen bearbeiten/ergänzen
     Für jede Sprache eigene Werte unter .en / .de eintragen.
     (nur relevant auf aircraft.html)
     ===================================================== */
  const specLabels = {
    en: { camera: "Camera", payload: "Payload", flight: "Flight Time", speed: "Top Speed" },
    de: { camera: "Kamera", payload: "Payload", flight: "Flugzeit", speed: "Top-Speed" }
  };

  const aircraftData = {
    en: [
      { name: "Raptor", tag: "Cinema Drone", role: "Feature Film & Premium Commercial",
        desc: "Our flagship for shoots where image quality comes first.",
        specs: { camera: "Sony FX6", payload: "4.5 kg", flight: "6 min", speed: ">100 km/h" },
        img: "../media/aircraft/raptor.jpg" },
      { name: "Lifter", tag: "Smaller Cinema Drone", role: "Cinema Camera Packages, Live Broadcast",
        desc: "Carries RED- and ARRI-compatible camera systems for cinema-grade footage.",
        specs: { camera: "RED / ARRI compatible", payload: "2 kg", flight: "5 min", speed: ">120 km/h" },
        img: "../media/aircraft/lifter.jpg" },
      { name: "7\" Whoop", tag: "High Quality Indoor Shots", role: "High Quality, Indoor, Around People",
        desc: "Compact and ready to fly in minutes — ideal for indoor flights and spontaneous setups.",
        specs: { camera: "Sony FX6", payload: "integrated", flight: "7 min", speed: "<50 km/h" },
        img: "../media/aircraft/7-whoop.jpg" },
      { name: "2.5\" Whoop", tag: "One-Shots", role: "Indoor, Sub-250g, Sports",
        desc: "A small platform for indoor flights, sub-250g payloads and sports action.",
        specs: { camera: "GoPro", payload: "integrated", flight: "5 min", speed: "50 km/h" },
        img: "../media/aircraft/25-whoop.jpg" },
      { name: "5\" Freestyle", tag: "Fun rig, fast sports, chasing", role: "Chasing, Sports",
      desc: "A modular platform for chasing and fun projects",
      specs: { camera: "GoPro, Sony ZV E10", payload: "integrated", flight: "9 min", speed: ">150 km/h" },
        img: "../media/aircraft/5-freestyle.jpg" }
    ],
    de: [
      { name: "Raptor", tag: "Cinema Drone", role: "Feature Film & Premium Commercial",
        desc: "Unser Flaggschiff für Aufnahmen, bei denen Bildqualität an erster Stelle steht.",
        specs: { camera: "Sony FX6", payload: "4.5 kg", flight: "6 min", speed: ">100 km/h" },
        img: "../media/aircraft/raptor.jpg" },
      { name: "Lifter", tag: "Smaller Cinema Drone", role: "Cinema Camera Packages, Live Broadcast",
        desc: "Trägt RED- und ARRI-kompatible Kamerasysteme für Aufnahmen mit Kinoqualität.",
        specs: { camera: "RED / ARRI kompatibel", payload: "2 kg", flight: "5 min", speed: ">120 km/h" },
        img: "../media/aircraft/lifter.jpg" },
      { name: "7\" Whoop", tag: "Kino Qualität Indoor", role: "Kino Qualität, Indoor, Um Menschen herum",
        desc: "Kompakt und schnell einsatzbereit — ideal für Scouting-Flüge und spontane Setups.",
        specs: { camera: "Sony FX6", payload: "integriert", flight: "7 min", speed: "<50 km/h" },
        img: "../media/aircraft/7-whoop.jpg" },
      { name: "2.5\" Whoop", tag: "One-Shots", role: "Indoor, Unter 250g, Sport",
        desc: "Eine kleine Plattform für Indoor-Flüge, Unter 250g und Sportaufnahmen.",
        specs: { camera: "GoPro", payload: "integriert", flight: "5 min", speed: "50 km/h" },
        img: "../media/aircraft/25-whoop.jpg" },
      { name: "5\" Freestyle", tag: "Spass, Sport, chasing", role: "Chasing, Sport",
      desc: "Eine modulare Plattform für Chasing und Spaßprojekte",
      specs: { camera: "GoPro, Sony ZV E10", payload: "integriert", flight: "9 min", speed: ">150 km/h" },
        img: "../media/aircraft/5-freestyle.jpg" }
    ]
  };

  const aircraft = aircraftData[LANG];
  const labels = specLabels[LANG];
  const listEl = document.getElementById('aircraftList');
  const detailEl = document.getElementById('aircraftDetail');
  const photoPlaceholderText = LANG === 'de'
    ? { title: (name) => `Foto-Platzhalter — ${name}`, size: "Format 4:3 · empfohlen 800×600px" }
    : { title: (name) => `Photo Placeholder — ${name}`, size: "4:3 format · recommended 800×600px" };

  function renderDetail(i){
    const a = aircraft[i];
    const specsHtml = `
      <div class="spec-row"><span>${labels.camera}</span><span>${a.specs.camera}</span></div>
      <div class="spec-row"><span>${labels.payload}</span><span>${a.specs.payload}</span></div>
      <div class="spec-row"><span>${labels.flight}</span><span>${a.specs.flight}</span></div>
      <div class="spec-row"><span>${labels.speed}</span><span>${a.specs.speed}</span></div>
    `;

    const mediaHtml = a.img 
      ? `<div class="ph-media" style="aspect-ratio: 4/3; overflow: hidden; border-radius: 6px; background: #000; margin-bottom: 24px;">
           <img src="${a.img}" alt="${a.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
         </div>`
      : `<div class="placeholder ph-media">
           <div class="ph-label"><b>${photoPlaceholderText.title(a.name)}</b>${photoPlaceholderText.size}</div>
         </div>`;

    detailEl.innerHTML = `
      ${mediaHtml}
      <h3>${a.name}</h3>
      <div class="aircraft-role">${a.role}</div>
      <p class="desc">${a.desc}</p>
      <div class="spec-table">${specsHtml}</div>
    `;
  }

  function renderList(){
    listEl.innerHTML = aircraft.map((a,i) => `
      <div class="aircraft-item ${i===0?'active':''}" data-i="${i}">
        <div class="aircraft-thumb" style="overflow: hidden; border-radius: 4px; background: #111;">
          ${a.img 
            ? `<img src="${a.img}" alt="${a.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">` 
            : (LANG === 'de' ? 'FOTO' : 'PHOTO')
          }
        </div>
        <div>
          <div class="aircraft-name">${a.name}</div>
          <div class="aircraft-tag">${a.tag}</div>
        </div>
        <div class="aircraft-arrow">→</div>
      </div>
    `).join('');

    listEl.querySelectorAll('.aircraft-item').forEach(item => {
      item.addEventListener('click', () => {
        listEl.querySelectorAll('.aircraft-item').forEach(x => x.classList.remove('active'));
        item.classList.add('active');
        renderDetail(parseInt(item.dataset.i));
      });
    });
  }

  if (listEl && detailEl) {
    renderList();
    renderDetail(0);
  }

  /* =====================================================
     WORK-DATEN — hier Projekte bearbeiten/ergänzen
     Projekttitel je Sprache; die Kategorie (cat) bleibt bewusst
     gleich, da sie auch als Filter-Wert auf work.html verwendet wird.
     (nur relevant auf work.html und der Home-Vorschau)
     ===================================================== */
  const projectsData = {
    en: [
      { title: "Opel & Swissski", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/opel_swissski_thumb.jpg" },
      { title: "Derendinger", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/derendinger_thumb.jpg" },
      { title: "Auto-Zürich", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/auto_zurich_thumb.jpg" },
      { title: "TF Bern", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/tf_bern_thumb.jpg" },
      { title: "LaserTeam AG", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/laserteam_ag_thumb.jpg" },
      { title: "Auto-Zürich One-Shot", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/auto_zurich_one_shot_thumb.jpg" },
      { title: "Melgar GmbH", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/melgar_gmbh_thumb.jpg" }
    ],
    de: [
      { title: "Opel & Swissski", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/opel_swissski_thumb.jpg" },
      { title: "Derendinger", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/derendinger_thumb.jpg" },
      { title: "Auto-Zürich", cat: "Commercial / Film / TV", video: "../media/work/test_video.mp4", poster: "../media/work/auto_zurich_thumb.jpg" },
      { title: "TF Bern", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/tf_bern_thumb.jpg" },
      { title: "LaserTeam AG", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/laserteam_ag_thumb.jpg" },
      { title: "Auto-Zürich One-Shot", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/auto_zurich_one_shot_thumb.jpg" },
      { title: "Melgar GmbH", cat: "Indoor / One-Shots", video: "../media/work/test_video.mp4", poster: "../media/work/melgar_gmbh_thumb.jpg" }
    ]
  };
  const projects = projectsData[LANG];

  const previewText = LANG === 'de'
    ? { label: "Preview-Foto-Platzhalter", size: "Format 16:9 · empfohlen 640×360px" }
    : { label: "Preview Photo Placeholder", size: "16:9 format · recommended 640×360px" };

  const workGrid = document.getElementById('workGrid');
  if (workGrid) {
    // 1. Render cards using the poster thumbnail if present
    workGrid.innerHTML = projects.map((p, i) => `
      <div class="work-card" data-i="${i}" data-cat="${p.cat}">
        <div class="work-media" style="position: relative; overflow: hidden; border-radius: 6px; aspect-ratio: 16/9; background: #111;">
          ${p.poster 
            ? `<img src="${p.poster}" alt="${p.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">`
            : `<div class="placeholder"><div class="ph-label"><b>${previewText.label}</b>${previewText.size}</div></div>`
          }
          <div class="play-btn"><span></span></div>
        </div>
        <div class="work-meta">
          <h4>${p.title}</h4>
          <span>${p.cat}</span>
        </div>
      </div>
    `).join('');

    const modal = document.getElementById('workModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const modalMedia = document.getElementById('modalMedia');

    // Helper function to stop/clear video playback
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('open');
      if (modalMedia) modalMedia.innerHTML = ''; // Stops audio and resets video
    }

    // 2. Open modal & inject the video directly into the modalMedia slot
    workGrid.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('click', () => {
        const p = projects[parseInt(card.dataset.i)];
        modalTitle.textContent = p.title + ' — ' + p.cat;

        if (modalMedia) {
          modalMedia.innerHTML = p.video
            ? `<video src="${p.video}" poster="${p.poster || ''}" controls autoplay playsinline style="width: 100%; height: 100%; object-fit: contain; display: block; background: #000;"></video>`
            : `<div class="placeholder on-dark"><div class="ph-label"><b>No Video Available</b></div></div>`;
        }

        modal.classList.add('open');
      });
    });

    // 3. Modal close handlers
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
      window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }

    /* Filter (nur auf work.html vorhanden) */
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset.filter;
          workGrid.querySelectorAll('.work-card').forEach(card => {
            card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
          });
        });
      });
    }
  }

  /* =====================================================
     TEAM-DATEN — hier Mitarbeitende bearbeiten/ergänzen
     Namen bleiben gleich, nur die Rollen-Bezeichnung wird übersetzt.
     ===================================================== */
  const teamData = {
    en: [
      { name: "Nikos Schürch", role: "Founder & Chief Pilot", img: "../media/team/Nikos_Schürch.jpg" },
      { name: "Luis Graser", role: "Founder & Admin", img: "../media/team/Luis_Graser.jpg" },
      { name: "Simon Gfeller", role: "Technical Assistant", img: "../media/team/Simon_Gfeller.jpg" }
    ],
    de: [
      { name: "Nikos Schürch", role: "Gründer & Chefpilot", img: "../media/team/Nikos_Schürch.jpg" },
      { name: "Luis Graser", role: "Gründer & Admin", img: "../media/team/Luis_Graser.jpg" },
      { name: "Simon Gfeller", role: "Technischer Assistent", img: "../media/team/Simon_Gfeller.jpg" }
    ]
  };
  const team = teamData[LANG];

  const teamPhotoText = LANG === 'de'
    ? { label: "Teamfoto-Platzhalter", size: "Format 3:4 · empfohlen 600×800px" }
    : { label: "Team Photo Placeholder", size: "3:4 format · recommended 600×800px" };

  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid) {
    teamGrid.innerHTML = team.map(m => `
      <div class="team-card">
        <div class="team-photo" style="aspect-ratio: 3/4; overflow: hidden; border-radius: 6px; background: #111;">
          ${m.img 
            ? `<img src="${m.img}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; display: block;">` 
            : `<div class="placeholder"><div class="ph-label"><b>${teamPhotoText.label}</b>${teamPhotoText.size}</div></div>`
          }
        </div>
        <h4 style="margin-top: 16px;">${m.name}</h4>
        <span>${m.role}</span>
      </div>
    `).join('');
  }

  /* ---------- Kontaktformular (Platzhalter, ohne Backend) ---------- */
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  if (form && formMsg) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      formMsg.classList.add('show');
      form.reset();
    });
  }

});
