/* =====================================================================
   OGŁOSZENIA – krótkie komunikaty (np. dyżury, terminy, zmiany)
   =====================================================================

   Wzór do skopiowania (wklej pod strzałkami, zmień teksty):

     {
       tytul:  "Tytuł ogłoszenia",
       data:   "06.10.2026",             ← data publikacji
       tresc:  "Treść ogłoszenia. Nowy akapit = pusta linia.",
       wazne:  false,                    ← true = czerwona etykieta „Ważne”
     },

   Najnowsze ogłoszenia wyświetlają się na górze automatycznie.
   ===================================================================== */

const OGLOSZENIA = [

  // ↓↓↓ NOWE OGŁOSZENIA WKLEJAJ TUTAJ ↓↓↓

  {
    tytul:  "Dyżury RSS w semestrze zimowym (przykład)",
    data:   "06.10.2026",
    tresc:  "Zapraszamy na dyżury w pokoju RSS: poniedziałki 12:00–14:00 oraz czwartki 10:00–12:00.",
    wazne:  false,
  },

  {
    tytul:  "Termin składania wniosków o stypendium (przykład)",
    data:   "01.10.2026",
    tresc:  "Wnioski o stypendium socjalne i rektora przyjmowane są do 15 października. Pomożemy w ich wypełnieniu na dyżurach.",
    wazne:  true,
  },

];
