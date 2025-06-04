// Beispielhafte Buchdaten
const buchdaten = {
    "Inklusion in der Hochschule": {
      fach: "Sozialwissenschaften",
      autor: "Dr. Eva Inklusiv",
      status: "verfügbar",
      beschreibung: "Ein Überblick über Konzepte, Herausforderungen und Chancen inklusiver Bildung im Hochschulbereich."
    },
    "Recht auf Gleichstellung": {
      fach: "Rechtswissenschaft",
      autor: "Prof. Dr. Gleich",
      status: "ausgeliehen",
      beschreibung: "Juristische Grundlagen und politische Entwicklungen zur Gleichstellung der Geschlechter."
    },
    // weitere Bücher...
  };
  
  document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const titel = params.get("titel");
    const buch = buchdaten[titel];
  
    if (buch) {
      document.getElementById("buchtitel").textContent = titel;
      document.getElementById("fachbereich").textContent = buch.fach;
      document.getElementById("autor").textContent = buch.autor;
      document.getElementById("beschreibung").textContent = buch.beschreibung;
  
      const statusElement = document.getElementById("status");
      statusElement.textContent = buch.status === "verfügbar" ? "Verfügbar" : "Ausgeliehen";
      statusElement.className = buch.status === "verfügbar" ? "verfuegbar" : "ausgeliehen";
  
// Formularsteuerung
document.getElementById("anfrageButton").addEventListener("click", () => {
    document.getElementById("anfrageFormular").hidden = false;
  });
  
  document.getElementById("abbrechen").addEventListener("click", () => {
    document.getElementById("anfrageFormular").hidden = true;
  });
  
  document.getElementById("ausleihForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const dauer = form.dauer.value;
    const isbn = form.isbn.value;
    const anmerkung = form.anmerkung.value;
  
    const body = `
  Hallo,
  
  ich möchte folgendes Buch ausleihen:
  
  📘 Titel: ${titel}
  👤 Name: ${name}
  📧 Mail: ${email}
  🕒 Leihdauer: ${dauer}
  🔢 ISBN: ${isbn}
  📝 Anmerkung: ${anmerkung}
  
  Viele Grüße
  ${name}
    `;
  
    const mailtoLink = `mailto:starsandmoonys@gmail.com?subject=Ausleiheanfrage: ${encodeURIComponent(titel)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  });
  
    }
  });
  
  