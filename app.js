(function () {
  const data = window.SITE_DATA;
  const root = document.documentElement;

  function getTheme() {
    return localStorage.getItem('eckis-theme') || 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const label = document.querySelector('[data-theme-label]');
    if (label) label.textContent = theme === 'dark' ? 'Nacht' : 'Tag';
  }

  function toggleTheme() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('eckis-theme', next);
    applyTheme(next);
  }

  function renderHeader(active) {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    header.innerHTML = `
      <div class="header">
        <div class="container header-inner">
          <a class="brand" href="index.html" aria-label="Startseite">
            <img src="images/logo.png" alt="Logo ${data.business.name}">
            <span>${data.business.name}</span>
          </a>
          <nav class="nav" aria-label="Hauptnavigation">
            <a href="index.html#willkommen" ${active==='home'?'aria-current="page"':''}>Willkommen</a>
            <a href="index.html#kueche">Unsere Küche</a>
            <a href="speisekarte.html" ${active==='menu'?'aria-current="page"':''}>Speisekarte</a>
            <a href="index.html#reservierung">Reservierung</a>
            <a href="index.html#kontakt">Kontakt</a>
          </nav>
          <div class="header-actions">
            <button class="toggle" type="button" data-theme-toggle>
              Modus: <span data-theme-label></span>
            </button>
            <a class="btn" href="${data.business.phoneHref}">Reservieren</a>
          </div>
        </div>
      </div>
    `;
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', toggleTheme);
    applyTheme(getTheme());
  }

  function renderFooter() {
    const footer = document.querySelector('[data-footer]');
    if (!footer) return;
    const legalLinks = data.footer.legalLinks.map(item => `<p><a href="${item.href}">${item.label}</a></p>`).join('');
    const hours = data.openingHours.map(item => `<p><strong>${item.day}:</strong> ${item.hours}</p>`).join('');
    footer.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h4>${data.business.name}</h4>
              <p>${data.business.description}</p>
              <p><a href="${data.business.instagram}" target="_blank" rel="noreferrer">Instagram</a> · <a href="${data.business.facebook}" target="_blank" rel="noreferrer">Facebook</a></p>
            </div>
            <div class="footer-col">
              <h4>${data.footer.legalTitle}</h4>
              ${legalLinks}
            </div>
            <div class="footer-col">
              <h4>${data.footer.hoursTitle}</h4>
              ${hours}
            </div>
            <div class="footer-col">
              <h4>${data.footer.contactTitle}</h4>
              <p>${data.business.addressName}<br>${data.business.addressStreet}<br>${data.business.addressCity}<br>${data.business.addressCountry}</p>
              <p><a href="${data.business.emailHref}">${data.business.email}</a></p>
            </div>
          </div>
          <div class="footer-bottom">© <span data-year></span> ${data.business.name}. Klausgemacht, klar gestaltet und einfach pflegbar.</div>
        </div>
      </footer>
    `;
    footer.querySelector('[data-year]').textContent = new Date().getFullYear();
  }

  function renderHome() {
    const hero = document.querySelector('[data-home-hero]');
    if (hero) {
      hero.innerHTML = `
        <section class="hero">
          <div class="container hero-grid">
            <div class="card hero-copy">
              <span class="eyebrow">${data.hero.eyebrow}</span>
              <h1>${data.hero.title}</h1>
              <p>${data.hero.text}</p>
              <div class="hero-actions">
                <a class="btn" href="${data.business.phoneHref}">${data.hero.ctaPrimary}</a>
                <a class="btn secondary" href="speisekarte.html">${data.hero.ctaSecondary}</a>
              </div>
              <p class="small" style="margin-top:18px;">${data.business.reservationNote}</p>
            </div>
            <div class="card hero-media">
              <img src="${data.hero.heroImage}" alt="Hero Ansicht ${data.business.name}">
              <div class="hero-badge">
                <strong>Die vielleicht längste Currywurstkarte Hannovers</strong>
                <span>Plus klassische Wirtshausgerichte, ehrliche Portionen und ein Gasthausgefühl ohne Theater.</span>
              </div>
            </div>
          </div>
        </section>
      `;
    }

    const intro = document.querySelector('[data-home-intro]');
    if (intro) {
      intro.innerHTML = `
        <section class="section" id="willkommen">
          <div class="container split">
            <div>
              <span class="eyebrow">Willkommen</span>
              <h2>${data.intro.title}</h2>
            </div>
            <div>
              ${data.intro.paragraphs.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>
        </section>
      `;
    }

    const kitchen = document.querySelector('[data-home-kitchen]');
    if (kitchen) {
      kitchen.innerHTML = `
        <section class="section-tight" id="kueche">
          <div class="container">
            <div style="max-width:700px; margin-bottom:24px;">
              <span class="eyebrow">Unsere Küche</span>
              <h2>Klassiker, Specials und klare Handschrift.</h2>
              <p>Die Inhalte der alten Website wurden übernommen und in eine flexiblere Struktur gebracht. Dadurch bleibt die Seite glaubwürdig, aber deutlich nutzbarer für echte Fotos, mehr Inhalt und sichtbare Handlungsaufforderungen.</p>
            </div>
            <div class="grid kitchen-grid">
              ${data.kitchenCards.map(card => `
                <article class="card kitchen-card">
                  <div class="icon">${card.icon}</div>
                  <h3>${card.title}</h3>
                  <p>${card.text}</p>
                </article>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    const gallery = document.querySelector('[data-home-gallery]');
    if (gallery) {
      const [first, ...rest] = data.imageStory.items;
      gallery.innerHTML = `
        <section class="section">
          <div class="container">
            <div class="split" style="align-items:end; margin-bottom:22px;">
              <div>
                <span class="eyebrow">Bilder & Atmosphäre</span>
                <h2>${data.imageStory.title}</h2>
              </div>
              <div><p>${data.imageStory.text}</p></div>
            </div>
            <div class="gallery-grid">
              <figure class="card gallery-item main">
                <img src="${first.src}" alt="${first.alt}">
                <figcaption class="gallery-label">${first.label}</figcaption>
              </figure>
              ${rest.map(item => `
                <figure class="card gallery-item">
                  <img src="${item.src}" alt="${item.alt}">
                  <figcaption class="gallery-label">${item.label}</figcaption>
                </figure>
              `).join('')}
            </div>
          </div>
        </section>
      `;
    }

    const menu = document.querySelector('[data-home-menu]');
    if (menu) {
      menu.innerHTML = `
        <section class="section-tight">
          <div class="container menu-preview">
            <div class="card content-block">
              <span class="eyebrow">Speisekarte</span>
              <h2>${data.menuTeaser.title}</h2>
              <p>${data.menuTeaser.text}</p>
              <a class="btn" href="speisekarte.html">Zur Speisekarte</a>
            </div>
            <div class="card content-block">
              <div class="category-list">
                ${data.menuTeaser.categories.map(c => `<span class="chip">${c}</span>`).join('')}
              </div>
              <div class="note" style="margin-top:22px;">Eigene Menü-Seite, vorbereitet für laufende Pflege, Preisänderungen und späteres Hinterlegen einer PDF-Datei.</div>
            </div>
          </div>
        </section>
      `;
    }

    const reservation = document.querySelector('[data-home-reservation]');
    if (reservation) {
      reservation.innerHTML = `
        <section class="section" id="reservierung">
          <div class="container card banner">
            <div>
              <span class="eyebrow">Reservierung</span>
              <h2>${data.reservation.title}</h2>
              <p>${data.reservation.text}</p>
              ${data.reservation.points.map(point => `<p>• ${point}</p>`).join('')}
            </div>
            <div style="display:grid; gap:12px; min-width:min(100%, 280px);">
              <a class="btn" href="${data.business.phoneHref}">Jetzt anrufen</a>
              <a class="btn secondary" href="${data.business.emailHref}">E-Mail senden</a>
            </div>
          </div>
        </section>
      `;
    }

    const contact = document.querySelector('[data-home-contact]');
    if (contact) {
      contact.innerHTML = `
        <section class="section-tight" id="kontakt">
          <div class="container hours-grid">
            <div class="card contact-box">
              <span class="eyebrow">Öffnungszeiten</span>
              <h2>Planbar, klar und schnell erfassbar.</h2>
              <div class="hours-list">
                ${data.openingHours.map(row => `
                  <div class="hours-row">
                    <strong>${row.day}</strong>
                    <span>${row.hours}</span>
                  </div>
                `).join('')}
              </div>
              <p style="margin-top:16px;">${data.business.reservationNote}</p>
            </div>
            <div class="grid" style="gap:24px;">
              <div class="card contact-box">
                <span class="eyebrow">Kontakt</span>
                <h2>Adresse und Reservierung</h2>
                <p><strong>${data.business.addressName}</strong><br>${data.business.addressStreet}<br>${data.business.addressCity}<br>${data.business.addressCountry}</p>
                <p><a href="${data.business.phoneHref}">${data.business.phone}</a><br><a href="${data.business.emailHref}">${data.business.email}</a></p>
                <div class="hero-actions" style="margin-top:6px;">
                  <a class="btn" href="${data.business.phoneHref}">Telefonisch reservieren</a>
                </div>
              </div>
              <div class="card map-placeholder">
                <div>
                  <h3 style="margin-bottom:10px;">Bereich für Lageplan oder Google Maps</h3>
                  <p>Dieser Block ist absichtlich frei gehalten. Hier kann später eine Karte, ein Screenshot, ein Anfahrtsbild oder ein Google-Maps-Embed eingesetzt werden.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
  }

  function renderMenuPage() {
    const node = document.querySelector('[data-menu-page]');
    if (!node) return;
    const pdfUrl = data.menuPage.pdfMenuUrl;
    node.innerHTML = `
      <section class="page-hero">
        <div class="container split">
          <div class="card">
            <span class="eyebrow">Speisekarte</span>
            <h1 style="font-size:clamp(40px, 6vw, 68px);">Separat gepflegte Menü-Seite</h1>
            <p>${data.menuPage.intro}</p>
            <div class="hero-actions">
              <a class="btn" href="${data.business.phoneHref}">Tisch reservieren</a>
              <a class="btn secondary" href="index.html">Zur Startseite</a>
            </div>
          </div>
          <div class="card content-block">
            <img src="images/menu-pdf.svg" alt="Platzhalter PDF-Menü" style="border-radius:18px; margin-bottom:18px;">
            ${pdfUrl ? `<a class="btn full" href="${pdfUrl}">${data.menuPage.pdfButtonLabel}</a>` : `<div class="note">Noch keine PDF verlinkt. In <strong>data.js</strong> einfach <strong>pdfMenuUrl</strong> setzen, dann erscheint hier automatisch der PDF-Button.</div>`}
          </div>
        </div>
      </section>
      <section class="section-tight">
        <div class="container menu-grid">
          ${data.menuPage.categories.map(cat => `
            <article class="card menu-card">
              <h2 style="font-size:36px;">${cat.title}</h2>
              <p>${cat.description}</p>
              ${cat.items.map(item => `
                <div class="menu-item">
                  <div>
                    <strong>${item.name}</strong>
                    <div class="small">${item.note || ''}</div>
                  </div>
                  <div><strong>${item.price}</strong></div>
                </div>
              `).join('')}
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderLegalPage(type) {
    const node = document.querySelector('[data-legal-page]');
    if (!node) return;
    if (type === 'impressum') {
      node.innerHTML = `
        <section class="page-hero">
          <div class="container">
            <div class="card legal-card">
              <span class="eyebrow">Rechtliches</span>
              <h1 style="font-size:clamp(40px, 6vw, 68px);">Impressum</h1>
              <p>Angaben gemäß § 5 TMG.</p>
              <h2 style="font-size:32px;">Diensteanbieter</h2>
              <p>${data.legal.provider}<br>${data.legal.providerStreet}<br>${data.legal.providerCity}</p>
              <h2 style="font-size:32px;">Kontakt</h2>
              <p>Telefon: <a href="${data.business.phoneHref}">${data.legal.providerPhone}</a><br>E-Mail: <a href="${data.business.emailHref}">${data.legal.providerEmail}</a></p>
              <h2 style="font-size:32px;">Geschäftsadresse</h2>
              <p>${data.business.addressName}<br>${data.business.addressStreet}<br>${data.business.addressCity}<br>${data.business.addressCountry}</p>
              <div class="note">Vor Veröffentlichung die Angaben auf Vollständigkeit und rechtliche Passung prüfen, insbesondere falls Rechtsform, Umsatzsteuer-ID oder weitere Pflichtangaben ergänzt werden müssen.</div>
            </div>
          </div>
        </section>
      `;
    } else {
      node.innerHTML = `
        <section class="page-hero">
          <div class="container">
            <div class="card legal-card">
              <span class="eyebrow">Rechtliches</span>
              <h1 style="font-size:clamp(40px, 6vw, 68px);">Datenschutzerklärung</h1>
              <p>Dies ist eine strukturierte Vorlage für eine Gastronomie-Website. Sie muss an das tatsächliche technische Setup angepasst werden.</p>
              <h2 style="font-size:32px;">1. Verantwortlicher</h2>
              <p>${data.legal.provider}<br>${data.legal.providerStreet}<br>${data.legal.providerCity}<br>E-Mail: <a href="${data.business.emailHref}">${data.legal.providerEmail}</a></p>
              <h2 style="font-size:32px;">2. Zugriffsdaten</h2>
              <p>Beim Besuch dieser Website können durch den Hosting-Anbieter automatisch technische Informationen verarbeitet werden, etwa IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und aufgerufene Seiten.</p>
              <h2 style="font-size:32px;">3. Kontaktaufnahme</h2>
              <p>Wenn Sie telefonisch oder per E-Mail Kontakt aufnehmen, werden die dabei übermittelten Daten zur Bearbeitung Ihrer Anfrage verwendet.</p>
              <h2 style="font-size:32px;">4. Externe Links und Dienste</h2>
              <p>Diese Website kann Links zu externen Diensten enthalten, etwa E-Mail-Anbieter, Social-Media-Profile oder Kartendienste. Beim Anklicken dieser Links gelten die Datenschutzbestimmungen der jeweiligen Anbieter.</p>
              <h2 style="font-size:32px;">5. Ihre Rechte</h2>
              <p>Sie haben im Rahmen der gesetzlichen Vorschriften das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch.</p>
              <h2 style="font-size:32px;">6. Hinweis zur Anpassung</h2>
              <p>Vor Livegang müssen Hosting-Anbieter, Analyse-Tools, eingebettete Karten, Schriftquellen, Cookie-Banner und eventuelle Reservierungsdienste konkret eingetragen werden.</p>
              <div class="note">Die vorige Website wurde mit anderen Drittanbietern ausgeliefert. Diese neue Version ist statischer und schlanker aufgebaut, trotzdem muss die Datenschutzerklärung vor Veröffentlichung an den echten Tech-Stack angepasst werden.</div>
            </div>
          </div>
        </section>
      `;
    }
  }

  renderFooter();
  window.EckisSite = { renderHeader, renderHome, renderMenuPage, renderLegalPage, applyTheme };
})();
