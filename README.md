# Kolesa Naprodaj — GitHub Pages

Preprosta statična spletna stran za prodajo rabljenih koles.

## Objavi na GitHub Pages

1. Na GitHubu ustvari nov repozitorij, npr. `kolesa`.
2. V repozitorij naloži celotno vsebino te mape.
3. Odpri **Settings → Pages**.
4. Pri **Build and deployment** izberi **Deploy from a branch**.
5. Izberi vejo `main` in mapo `/ (root)`.
6. Shrani. GitHub bo prikazal naslov objavljene strani.

## Dodaj svoja kolesa

Odpri `data/bikes.json`.

Vsako kolo je en objekt. Primer:

```json
{
  "id": "007",
  "brand": "KTM",
  "model": "Chicago",
  "type": "Gorsko",
  "size": "L",
  "wheelSize": "29",
  "price": 450,
  "status": "Na voljo",
  "year": 2021,
  "image": "images/007/glavna.jpg",
  "description": "Kratek opis kolesa.",
  "serviced": [
    "nova veriga",
    "nastavljene zavore"
  ]
}
```

Veljavne vrednosti za `status`:
- `Na voljo`
- `Rezervirano`
- `Prodano`

## Fotografije

Primer:
`images/007/glavna.jpg`

Nato v `bikes.json` nastavi:
`"image": "images/007/glavna.jpg"`

## Spremeni kontakt

V `index.html` poišči:
- `tvoj@email.si`
- `040 123 456`
- `+38640123456`

in jih zamenjaj s svojimi podatki.

## Spremeni ime strani

V `index.html` poišči `Kolesa Naprodaj` in zamenjaj z želenim imenom.
