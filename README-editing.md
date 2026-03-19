# Bearbeitung

## Zentral ändern
Fast alle Inhalte liegen in `data.js`.

Dort können Sie ändern:
- Telefonnummer
- E-Mail
- Adresse
- Öffnungszeiten
- Texte auf der Startseite
- Menü-Kategorien und Preise
- PDF-Link für die Speisekarte
- Footer-Inhalte

## Bilder tauschen
1. Neue Bilder in den Ordner `images` legen.
2. In `data.js` bei `hero.heroImage` oder `imageStory.items` den Dateinamen anpassen.

## PDF-Menü aktivieren
In `data.js` den Wert `menuPage.pdfMenuUrl` setzen, z. B.:

`pdfMenuUrl: "assets/eckis-speisekarte.pdf"`

Dann erscheint auf der Menü-Seite automatisch ein PDF-Button.

## Reservierungsbutton
Die Reservierung läuft aktuell über den Telefon-Link in `business.phoneHref`.

## Hinweise
- Die Seite ist bewusst statisch und einfach gehalten, damit sie später leicht bearbeitet werden kann.
- Die Datenschutzerklärung ist eine Vorlage und muss an das echte Hosting- und Tool-Setup angepasst werden.
