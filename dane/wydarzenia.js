/* =====================================================================
   WYDARZENIA – tu dodajesz nowe wydarzenia
   =====================================================================

   NAJŁATWIEJ: otwórz stronę  dodaj.html , wypełnij formularz,
   kliknij „Kopiuj” i wklej gotowy fragment poniżej (instrukcja jest
   na tamtej stronie).

   RĘCZNIE: skopiuj poniższy wzór, wklej go pod linią
   „↓↓↓ NOWE WYDARZENIA WKLEJAJ TUTAJ ↓↓↓” i zmień teksty w cudzysłowach.

     {
       tytul:     "Nazwa wydarzenia",
       data:      "24.10.2026",          ← dzień.miesiąc.rok
       godzina:   "18:00",               ← można zostawić puste: ""
       miejsce:   "Aula MFI, Wita Stwosza 57",
       kategoria: "integracja",          ← integracja / nauka / kultura / sport / spotkanie / inne
       opis:      "Krótki opis. Nowy akapit zaczynasz od pustej linii.",
       link:      "",                    ← np. link do wydarzenia na Facebooku (opcjonalnie)
       obrazek:   "",                    ← np. "obrazki/plakat.jpg" (opcjonalnie)
     },

   ZASADY (żeby nic się nie zepsuło):
   • Każde wydarzenie jest w nawiasach { } i kończy się PRZECINKIEM.
   • Teksty zawsze w "cudzysłowach". Jeśli w tekście potrzebujesz
     cudzysłowu, użyj „polskich” albo pojedynczych 'apostrofów'.
   • Kolejność wydarzeń nie ma znaczenia – strona sama je posortuje
     i sama przeniesie zakończone do zakładki „Minione”.
   • Nie trzeba niczego usuwać – stare wydarzenia tworzą archiwum.
   ===================================================================== */

const WYDARZENIA = [

  // ↓↓↓ NOWE WYDARZENIA WKLEJAJ TUTAJ ↓↓↓

  {
    tytul:     "Wigilia Wydziałowa MFI (przykład)",
    data:      "16.12.2026",
    godzina:   "17:00",
    miejsce:   "Hol główny, Wydział MFI",
    kategoria: "integracja",
    opis:      "Świąteczne spotkanie studentów i pracowników wydziału. Opłatek, kolędy i barszcz.\n\nZabierz ze sobą kubek!",
    link:      "",
    obrazek:   "",
  },

  {
    tytul:     "Turniej planszówek (przykład)",
    data:      "20.11.2026",
    godzina:   "16:00",
    miejsce:   "Sala 107, Wydział MFI",
    kategoria: "integracja",
    opis:      "Wieczór gier planszowych – przyjdź sam lub ze znajomymi. Gry zapewniamy.",
    link:      "",
    obrazek:   "",
  },

  {
    tytul:     "Wykład popularnonaukowy: Matematyka w kryptografii (przykład)",
    data:      "05.11.2026",
    godzina:   "18:15",
    miejsce:   "Aula A, Wydział MFI",
    kategoria: "nauka",
    opis:      "Jak liczby pierwsze chronią nasze dane? Otwarty wykład dla wszystkich zainteresowanych.",
    link:      "",
    obrazek:   "",
  },

  {
    tytul:     "Otwarte zebranie RSS MFI (przykład)",
    data:      "22.10.2026",
    godzina:   "19:00",
    miejsce:   "Sala 2.20, Wydział MFI",
    kategoria: "spotkanie",
    opis:      "Zebranie otwarte dla wszystkich studentów wydziału. Masz pomysł albo problem? Przyjdź i powiedz!",
    link:      "",
    obrazek:   "",
  },

  {
    tytul:     "Integracja pierwszego roku (przykład)",
    data:      "03.10.2026",
    godzina:   "16:00",
    miejsce:   "Kampus Oliwa",
    kategoria: "integracja",
    opis:      "Gra terenowa po kampusie dla nowych studentów MFI.",
    link:      "",
    obrazek:   "",
  },

];
