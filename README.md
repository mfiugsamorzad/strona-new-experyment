# Strona RSS MFI UG

Strona Rady Samorządu Studentów Wydziału Matematyki, Fizyki i Informatyki Uniwersytetu Gdańskiego.

Zwykły HTML + CSS + JS – bez instalowania czegokolwiek. Działa po otwarciu `index.html`
w przeglądarce oraz na dowolnym hostingu statycznym (np. GitHub Pages).

## Zakładki

Start · Wydarzenia (nadchodzące / minione, filtr kategorii, wyszukiwarka, „Dodaj do kalendarza”) ·
Ogłoszenia · O nas (skład Rady) · Dla studentów (linki, dokumenty, FAQ) · Kontakt

## Jak dodać wydarzenie (bez programowania)

1. Otwórz stronę **`dodaj.html`** (link „Dodaj wydarzenie” w stopce strony).
2. Wypełnij formularz i kliknij **Kopiuj fragment**.
3. Na GitHubie otwórz plik `dane/wydarzenia.js`, kliknij ołówek ✏️.
4. Wklej fragment pod linią `// ↓↓↓ NOWE WYDARZENIA WKLEJAJ TUTAJ ↓↓↓`.
5. Kliknij **Commit changes**. Gotowe.

Strona sama sortuje wydarzenia i przenosi zakończone do „Minionych” – nic nie trzeba usuwać.

## Gdzie co edytować

| Co chcesz zmienić          | Plik                    |
|----------------------------|-------------------------|
| Wydarzenia                 | `dane/wydarzenia.js`    |
| Ogłoszenia                 | `dane/ogloszenia.js`    |
| Skład Rady                 | `dane/zespol.js`        |
| Plakaty / zdjęcia          | folder `obrazki/`       |
| Teksty stałe, kontakt, FAQ | `index.html`            |
| Kolory i wygląd            | `css/styl.css`          |

Każdy plik w `dane/` ma na górze wzór do skopiowania i instrukcję.

## Wytyczne

- Kolor wiodący: **Błękit Uniwersytetu Gdańskiego `#0041D2`** (księga znaku UG, identyfikacja.ug.edu.pl).
- Dostępność zgodnie z WCAG 2.1 AA (ustawa o dostępności cyfrowej): kontrasty, nawigacja klawiaturą,
  link „Przejdź do treści”, etykiety pól, `lang="pl"`, czytelność na telefonie.
- Logo „RSS” w nagłówku to tymczasowy znak – do podmiany na oficjalne logo samorządu
  (logo UG wolno stosować tylko zgodnie z księgą znaku).

## Publikacja na GitHub Pages

Settings → Pages → Source: „Deploy from a branch” → gałąź `main`, folder `/ (root)`.
