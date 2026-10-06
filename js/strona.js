/* =====================================================================
   Logika strony RSS MFI UG.
   Tego pliku NIE trzeba edytować, żeby dodać wydarzenie –
   treści są w folderze „dane”.
   ===================================================================== */
(function () {
  "use strict";

  var MIESIACE = ["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru"];
  var MIESIACE_PELNE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca",
    "sierpnia", "września", "października", "listopada", "grudnia"];
  var DNI = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
  var KATEGORIE = {
    integracja: "Integracja",
    nauka: "Nauka",
    kultura: "Kultura",
    sport: "Sport",
    spotkanie: "Spotkanie",
    inne: "Inne"
  };

  /* ---------- Pomocnicze ---------- */

  function el(id) { return document.getElementById(id); }

  function escapuj(tekst) {
    return String(tekst == null ? "" : tekst)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Zamienia zwykły tekst na akapity; linki http(s) stają się klikalne.
  function akapity(tekst) {
    return String(tekst || "").trim().split(/\n\s*\n/).map(function (a) {
      var html = escapuj(a)
        .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" rel="noopener">$1</a>')
        .replace(/\n/g, "<br>");
      return "<p>" + html + "</p>";
    }).join("");
  }

  // Akceptuje „24.10.2026”, „4.1.2026” i „2026-10-24”.
  function parsujDate(tekst) {
    var s = String(tekst || "").trim(), m;
    if ((m = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/))) return nowaData(+m[3], +m[2], +m[1]);
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return nowaData(+m[1], +m[2], +m[3]);
    return null;
  }
  function nowaData(r, m, d) {
    var data = new Date(r, m - 1, d);
    return (data.getMonth() === m - 1 && data.getDate() === d) ? data : null;
  }

  function dzisiaj() {
    var d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function dataSlownie(d) {
    return DNI[d.getDay()] + ", " + d.getDate() + " " + MIESIACE_PELNE[d.getMonth()] + " " + d.getFullYear();
  }

  function kategoria(k) {
    var klucz = String(k || "inne").toLowerCase().trim();
    return KATEGORIE[klucz] ? klucz : "inne";
  }

  function pokazBlad(kontener, plik) {
    kontener.innerHTML = '<div class="komunikat-bledu" role="alert"><strong>Nie udało się wczytać danych.</strong> ' +
      'Prawdopodobnie w pliku <code>' + plik + '</code> jest literówka – sprawdź, czy każdy wpis kończy się ' +
      'przecinkiem, a teksty są w cudzysłowach. Szczegóły w konsoli przeglądarki (F12).</div>';
  }

  /* ---------- Dane ---------- */

  var bladWydarzen = typeof WYDARZENIA === "undefined" || !Array.isArray(WYDARZENIA);
  var bladOgloszen = typeof OGLOSZENIA === "undefined" || !Array.isArray(OGLOSZENIA);
  var bladZespolu = typeof ZESPOL === "undefined" || !Array.isArray(ZESPOL);

  var wydarzenia = bladWydarzen ? [] : WYDARZENIA.map(function (w, i) {
    var d = parsujDate(w.data);
    if (!d || !w.tytul) {
      console.warn("Pominięto wydarzenie nr " + (i + 1) + " – brak tytułu lub zły format daty (użyj np. 24.10.2026):", w);
      return null;
    }
    var godz = String(w.godzina || "").trim();
    var mg = godz.match(/^(\d{1,2})[:.](\d{2})$/);
    return {
      tytul: String(w.tytul),
      data: d,
      godzina: mg ? (mg[1].padStart(2, "0") + ":" + mg[2]) : "",
      miejsce: w.miejsce || "",
      kategoria: kategoria(w.kategoria),
      opis: w.opis || "",
      link: w.link || "",
      obrazek: w.obrazek || ""
    };
  }).filter(Boolean);

  var ogloszenia = bladOgloszen ? [] : OGLOSZENIA.map(function (o) {
    return { tytul: o.tytul || "", data: parsujDate(o.data), tresc: o.tresc || "", wazne: !!o.wazne };
  }).filter(function (o) { return o.tytul; })
    .sort(function (a, b) { return (b.data || 0) - (a.data || 0); });

  function nadchodzace() {
    var t = dzisiaj();
    return wydarzenia.filter(function (w) { return w.data >= t; })
      .sort(function (a, b) { return a.data - b.data || a.godzina.localeCompare(b.godzina); });
  }
  function minione() {
    var t = dzisiaj();
    return wydarzenia.filter(function (w) { return w.data < t; })
      .sort(function (a, b) { return b.data - a.data; });
  }

  /* ---------- Renderowanie ---------- */

  function kartaWydarzenia(w, indeks, czyMinione) {
    var d = w.data;
    var meta = '<span>📅 ' + dataSlownie(d) + (w.godzina ? ", godz. " + w.godzina : "") + '</span>';
    if (w.miejsce) meta += '<span>📍 ' + escapuj(w.miejsce) + '</span>';

    var akcje = "";
    if (w.link) akcje += '<a class="przycisk przycisk--maly" href="' + escapuj(w.link) + '" rel="noopener" target="_blank">Szczegóły<span class="sr-only"> (otwiera się w nowej karcie)</span></a>';
    if (!czyMinione) akcje += '<button type="button" class="przycisk przycisk--obrys przycisk--maly" data-ics="' + indeks + '">Dodaj do kalendarza</button>';

    return '<article class="karta wydarzenie' + (czyMinione ? " wydarzenie--minione" : "") + '">' +
      '<div class="data-blok" aria-hidden="true">' +
        '<span class="data-blok__dzien">' + d.getDate() + '</span>' +
        '<span class="data-blok__miesiac">' + MIESIACE[d.getMonth()] + '</span>' +
        '<span class="data-blok__rok">' + d.getFullYear() + '</span>' +
      '</div>' +
      '<div>' +
        '<span class="etykieta etykieta--' + w.kategoria + '">' + KATEGORIE[w.kategoria] + '</span>' +
        '<h3>' + escapuj(w.tytul) + '</h3>' +
        '<div class="wydarzenie__meta">' + meta + '</div>' +
        (w.obrazek ? '<img class="wydarzenie__obrazek" src="' + escapuj(w.obrazek) + '" alt="Plakat: ' + escapuj(w.tytul) + '" loading="lazy">' : "") +
        (w.opis ? '<div class="wydarzenie__opis">' + akapity(w.opis) + '</div>' : "") +
        (akcje ? '<div class="wydarzenie__akcje">' + akcje + '</div>' : "") +
      '</div>' +
    '</article>';
  }

  function kartaOgloszenia(o) {
    return '<article class="karta ogloszenie">' +
      (o.wazne ? '<span class="etykieta etykieta--wazne">Ważne</span>' : "") +
      '<h3>' + escapuj(o.tytul) + '</h3>' +
      (o.data ? '<p class="ogloszenie__data">' + o.data.getDate() + " " + MIESIACE_PELNE[o.data.getMonth()] + " " + o.data.getFullYear() + '</p>' : "") +
      akapity(o.tresc) +
    '</article>';
  }

  // Lista aktualnie widocznych wydarzeń (do przycisku „Dodaj do kalendarza”).
  var widoczne = [];

  function renderujListe(kontener, lista, czyMinione, komunikatPusto) {
    if (!lista.length) {
      kontener.innerHTML = '<p class="pusto">' + komunikatPusto + '</p>';
      return;
    }
    kontener.innerHTML = lista.map(function (w) {
      widoczne.push(w);
      return kartaWydarzenia(w, widoczne.length - 1, czyMinione);
    }).join("");
  }

  /* Start */
  function renderujStart() {
    var kw = el("start-wydarzenia"), ko = el("start-ogloszenia");
    if (bladWydarzen) pokazBlad(kw, "dane/wydarzenia.js");
    else renderujListe(kw, nadchodzace().slice(0, 3), false, "Na razie brak zaplanowanych wydarzeń – zajrzyj wkrótce!");

    if (bladOgloszen) pokazBlad(ko, "dane/ogloszenia.js");
    else ko.innerHTML = ogloszenia.length
      ? ogloszenia.slice(0, 2).map(kartaOgloszenia).join("")
      : '<p class="pusto">Brak ogłoszeń.</p>';
  }

  /* Zakładka Wydarzenia */
  var stan = { czas: "nadchodzace", kategoria: "", fraza: "" };
  var listaStart = []; // wydarzenia pokazane na stronie Start

  function renderujWydarzenia() {
    var kontener = el("lista-wydarzen");
    if (bladWydarzen) { pokazBlad(kontener, "dane/wydarzenia.js"); return; }

    var czyMinione = stan.czas === "minione";
    var fraza = stan.fraza.toLowerCase();
    var lista = (czyMinione ? minione() : nadchodzace()).filter(function (w) {
      if (stan.kategoria && w.kategoria !== stan.kategoria) return false;
      if (fraza && (w.tytul + " " + w.opis + " " + w.miejsce).toLowerCase().indexOf(fraza) === -1) return false;
      return true;
    });

    widoczne = listaStart.slice();
    renderujListe(kontener, lista, czyMinione,
      czyMinione ? "Brak minionych wydarzeń spełniających kryteria." : "Brak nadchodzących wydarzeń spełniających kryteria.");
    el("liczba-wydarzen").textContent = "Znaleziono wydarzeń: " + lista.length;
  }

  function przygotujFiltry() {
    var chipy = el("filtr-kategorii");
    var uzyte = {};
    wydarzenia.forEach(function (w) { uzyte[w.kategoria] = true; });
    var html = '<button type="button" class="chip" data-kategoria="" aria-pressed="true">Wszystkie</button>';
    Object.keys(KATEGORIE).forEach(function (k) {
      if (uzyte[k]) html += '<button type="button" class="chip" data-kategoria="' + k + '" aria-pressed="false">' + KATEGORIE[k] + '</button>';
    });
    chipy.innerHTML = html;

    chipy.addEventListener("click", function (e) {
      var b = e.target.closest("[data-kategoria]");
      if (!b) return;
      stan.kategoria = b.getAttribute("data-kategoria");
      chipy.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      renderujWydarzenia();
    });

    document.querySelectorAll("[data-czas]").forEach(function (b) {
      b.addEventListener("click", function () {
        stan.czas = b.getAttribute("data-czas");
        document.querySelectorAll("[data-czas]").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        renderujWydarzenia();
      });
    });

    el("szukaj-wydarzen").addEventListener("input", function (e) {
      stan.fraza = e.target.value.trim();
      renderujWydarzenia();
    });
  }

  /* Ogłoszenia */
  function renderujOgloszenia() {
    var k = el("lista-ogloszen");
    if (bladOgloszen) { pokazBlad(k, "dane/ogloszenia.js"); return; }
    k.innerHTML = ogloszenia.length ? ogloszenia.map(kartaOgloszenia).join("") : '<p class="pusto">Brak ogłoszeń.</p>';
  }

  /* Zespół */
  function renderujZespol() {
    var k = el("lista-zespolu");
    if (bladZespolu) { pokazBlad(k, "dane/zespol.js"); return; }
    k.innerHTML = ZESPOL.map(function (o) {
      var inicjaly = String(o.imie || "?").split(/\s+/).map(function (s) { return s.charAt(0); }).join("").slice(0, 2).toUpperCase();
      var awatar = o.zdjecie ? '<img src="' + escapuj(o.zdjecie) + '" alt="">' : escapuj(inicjaly);
      return '<div class="karta osoba">' +
        '<div class="osoba__awatar" aria-hidden="true">' + awatar + '</div>' +
        '<div><h3>' + escapuj(o.imie) + '</h3><p>' + escapuj(o.funkcja) + '</p>' +
        (o.kontakt ? '<p><a href="mailto:' + escapuj(o.kontakt) + '">' + escapuj(o.kontakt) + '</a></p>' : "") +
        '</div></div>';
    }).join("");
  }

  /* ---------- Plik kalendarza (.ics) ---------- */

  function dwa(n) { return String(n).padStart(2, "0"); }
  function icsTekst(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;"); }

  function pobierzIcs(w) {
    var d = w.data;
    var ymd = d.getFullYear() + dwa(d.getMonth() + 1) + dwa(d.getDate());
    var start, koniec;
    if (w.godzina) {
      var g = w.godzina.split(":");
      var p = new Date(d.getFullYear(), d.getMonth(), d.getDate(), +g[0], +g[1]);
      var k = new Date(p.getTime() + 2 * 3600 * 1000);
      var f = function (x) { return x.getFullYear() + dwa(x.getMonth() + 1) + dwa(x.getDate()) + "T" + dwa(x.getHours()) + dwa(x.getMinutes()) + "00"; };
      start = "DTSTART;TZID=Europe/Warsaw:" + f(p);
      koniec = "DTEND;TZID=Europe/Warsaw:" + f(k);
    } else {
      var n = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      start = "DTSTART;VALUE=DATE:" + ymd;
      koniec = "DTEND;VALUE=DATE:" + n.getFullYear() + dwa(n.getMonth() + 1) + dwa(n.getDate());
    }
    var ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RSS MFI UG//Wydarzenia//PL", "BEGIN:VEVENT",
      "UID:" + ymd + "-" + Math.random().toString(36).slice(2) + "@rss-mfi-ug",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, ""),
      start, koniec,
      "SUMMARY:" + icsTekst(w.tytul),
      "LOCATION:" + icsTekst(w.miejsce),
      "DESCRIPTION:" + icsTekst(w.opis + (w.link ? "\n\n" + w.link : "")),
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    var url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = w.tytul.replace(/[^\wąćęłńóśźżĄĆĘŁŃÓŚŹŻ -]/g, "").trim().replace(/\s+/g, "-") + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-ics]");
    if (b && widoczne[+b.getAttribute("data-ics")]) pobierzIcs(widoczne[+b.getAttribute("data-ics")]);
  });

  /* ---------- Zakładki ---------- */

  var panele = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  var zakladki = Array.prototype.slice.call(document.querySelectorAll(".zakladka"));

  function pokazZakladke(id, przeniesFokus) {
    if (!panele.some(function (p) { return p.id === id; })) id = "start";
    panele.forEach(function (p) { p.hidden = p.id !== id; });
    zakladki.forEach(function (z) {
      if (z.getAttribute("href") === "#" + id) z.setAttribute("aria-current", "page");
      else z.removeAttribute("aria-current");
    });
    var aktywna = zakladki.filter(function (z) { return z.getAttribute("href") === "#" + id; })[0];
    if (aktywna && aktywna.scrollIntoView) aktywna.scrollIntoView({ block: "nearest", inline: "nearest" });

    var tytul = { "start": "", "wydarzenia": "Wydarzenia", "ogloszenia": "Ogłoszenia", "o-nas": "O nas", "dla-studentow": "Dla studentów", "kontakt": "Kontakt" }[id];
    document.title = (tytul ? tytul + " – " : "") + "RSS MFI UG";

    window.scrollTo(0, 0);
    if (przeniesFokus) {
      var h = document.querySelector("#" + id + " h1, #" + id + " h2");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }
  }

  window.addEventListener("hashchange", function () {
    var id = location.hash.slice(1);
    // Kotwice, które nie są zakładkami (np. „Przejdź do treści”), zostawiamy przeglądarce.
    var cel = id && el(id);
    if (id && !(cel && cel.classList.contains("panel"))) return;
    pokazZakladke(id, true);
  });

  /* ---------- Start ---------- */

  renderujStart();
  listaStart = widoczne.slice();
  if (!bladWydarzen) przygotujFiltry();
  renderujWydarzenia();
  renderujOgloszenia();
  renderujZespol();
  el("rok").textContent = new Date().getFullYear();
  pokazZakladke(location.hash.slice(1), false);
})();
