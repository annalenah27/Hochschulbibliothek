document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn    = document.getElementById("toggleAdvancedButton");
  const advanced     = document.getElementById("advancedSearch");
  const simpleForm   = document.getElementById("simpleSearchForm");
  const advancedForm = document.getElementById("advancedForm");
  const ergebnisse   = document.getElementById("ergebnisse");

  /* ---------- Ausgabe-Helfer ---------- */
  function zeigeErgebnisse(buecher) {
    if (buecher.length === 0) {
      zeigeKeineTreffer();
      return;
    }
    ergebnisse.innerHTML = buecher
      .map(
        buch => `
          <div class="result-card">
            <a href="${buch.id}.html" class="result-title">${buch.anzeige}</a>
          </div>`
      )
      .join("");
  }

  function zeigeKeineTreffer(txt = "Keine passenden Ergebnisse gefunden.") {
    ergebnisse.innerHTML = `<p>${txt}</p>`;
  }

  /* ---------- einfache Suche ---------- */
  if (simpleForm) {
    simpleForm.addEventListener("submit", e => {
      e.preventDefault();
      const input = simpleForm.querySelector('input[name="query"]');
      const q     = input.value.toLowerCase().trim();

      if (!q) {
        zeigeKeineTreffer("Bitte geben Sie einen Suchbegriff ein.");
        return;
      }

      const treffer = datenbank.filter(b =>
        b.autor .toLowerCase().includes(q) ||
        b.titel .toLowerCase().includes(q) ||
        b.genre .toLowerCase().includes(q) ||
        (b.isbn   ?? "").toLowerCase().includes(q) ||  // neu
        (b.verlag ?? "").toLowerCase().includes(q)     // neu
      );

      zeigeErgebnisse(treffer);
      input.value = "";
    });
  }

  /* ---------- erweiterte Suche ---------- */
  if (advancedForm) {
    advancedForm.addEventListener("submit", e => {
      e.preventDefault();

      const autor   = document.getElementById("autor").value .toLowerCase().trim();
      const titel   = document.getElementById("titel").value .toLowerCase().trim();
      const isbn    = document.getElementById("isbn").value  .toLowerCase().trim();   // neu
      const verlag  = document.getElementById("verlag").value.toLowerCase().trim();   // neu
      const genres  = Array.from(
        document.querySelectorAll("input[name='genre']:checked")
      ).map(g => g.value.toLowerCase());

      if (!autor && !titel && !isbn && !verlag && genres.length === 0) {
        zeigeKeineTreffer("Bitte geben Sie mindestens ein Suchkriterium ein.");
        return;
      }

      const treffer = datenbank.filter(b => {
        const a = autor   ? b.autor .toLowerCase().includes(autor)   : true;
        const t = titel   ? b.titel .toLowerCase().includes(titel)   : true;
        const i = isbn    ? (b.isbn   ?? "").toLowerCase().includes(isbn)   : true;
        const v = verlag  ? (b.verlag ?? "").toLowerCase().includes(verlag) : true;
        const g = genres.length
                  ? genres.includes(b.genre.toLowerCase())
                  : true;
        return a && t && i && v && g;
      });

      zeigeErgebnisse(treffer);
      // advancedForm.reset();    // auskommentiert, damit Ergebnis sichtbar bleibt
    });
  }

  /* ---------- Toggle „Erweiterte Suche“ ---------- */
  toggleBtn.addEventListener("click", () => {
    const hidden = advanced.hasAttribute("hidden");
    advanced.toggleAttribute("hidden");
    toggleBtn.textContent = hidden ? "Einfache Suche" : "Erweiterte Suche";
  });

  /* ---------- Reset-Hinweis ---------- */
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("reset", () => {
      setTimeout(() => {
        const autor   = document.getElementById("autor")?.value.trim();
        const titel   = document.getElementById("titel")?.value.trim();
        const isbn    = document.getElementById("isbn")?.value.trim();
        const verlag  = document.getElementById("verlag")?.value.trim();
        const genres  = document.querySelectorAll("input[name='genre']:checked");
        const query   = document.querySelector('input[name="query"]')?.value.trim();

        if (!autor && !titel && !isbn && !verlag && genres.length === 0 && !query) {
          zeigeKeineTreffer("Bitte starten Sie eine Suche, um Ergebnisse zu sehen.");
        }
      }, 0);
    });
  });
});

















