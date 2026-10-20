# GTA V-style image prompts

Prompts para sa mga larawan ng portfolio. I-generate sa AI image tool, tapos i-save gamit ang eksaktong filename sa `public/images/jm/` para mapalitan ang luma nang walang code change.

## Paano gamitin

1. Kung kaya ng tool mo ang **image reference** (image-to-image o "character reference"), i-upload ang litrato mo para ikaw pa rin ang nasa hero at roles na larawan.
2. Kopyahin ang **Style block** at idikit sa dulo ng bawat prompt para pare-pareho ang dating.
3. Kung tumanggi ang tool dahil sa "Grand Theft Auto", gamitin ang **Alternate style block**.
4. I-save bilang PNG o JPG sa tamang sukat. Okay lang kung mas malaki, basta pareho ang ratio.

## Mga patakaran

- Walang logo, title, o text sa loob ng larawan. Ang site na ang maglalagay ng text.
- Walang official GTA characters, Rockstar logo, o kopya ng totoong loading screen. Istilo lang ang ginagaya.
- Walang baril o krimen. Propesyonal na portfolio ito, kaya laptop, phone, at code ang "gear" mo.
- Iwanan ang kaliwa o ibabang bahagi na medyo madilim o simple, dahil doon ilalagay ang text.

## Style block

```
Illustrated in the style of a Grand Theft Auto V loading screen: hand-painted digital illustration, bold dark ink outlines, cel-shaded skin and clothing with painterly gradients, saturated golden-hour palette of orange, magenta and teal, slightly heroic proportions, dramatic low-angle composition, subtle halftone and grain texture, sunny Southern California city mood. No text, no logos, no watermark, no weapons.
```

## Alternate style block

```
Comic-poster illustration in the style of 2010s open-world game loading-screen art: hand-painted, bold black outlines, cel shading, saturated sunset palette of orange, magenta and teal, dramatic low-angle composition, halftone grain texture, sunny coastal city mood. No text, no logos, no watermark, no weapons.
```

## Hero slides (3 larawan)

Sukat: **1536 × 1024** (3:2). Ipinapakita sa malaking hero sa HOME. Ang text ay nasa kaliwa-ibaba, kaya ilagay ang tao sa kanan.

### `1.png`: Rider

```
A young Filipino man with short black hair and dark sunglasses, wearing a black polo shirt, beige chinos and white sneakers, sitting sideways on a dark grey maxi-scooter, looking at his smartphone. Behind him is a glowing coastal city skyline with palm trees at sunset. Subject on the right third of the frame, open sky and road on the left.
```

### `2.png`: Night shift

```
The same young Filipino man in a black hoodie, sitting at a desk in a dim high-rise apartment at night, three monitors glowing with code editors and node-based workflow diagrams, mechanical keyboard, coffee cup, city lights through a large window behind him. Subject on the right third, darker empty wall on the left.
```

### `3.png`: On the move

```
The same young Filipino man walking confidently down a palm-lined boulevard at dusk, laptop bag over one shoulder, wireless earbuds, holding a phone showing a notification. Hills and a city skyline behind him, warm orange sky. Low-angle shot, subject on the right third.
```

## Menu tiles (4 larawan)

Sukat: **1536 × 1024** (3:2). Ipinapakita ang mga ito bilang malapad na strip (halos 3:1), kaya ilagay ang pangunahing bagay sa **gitnang pahalang na bahagi**. Mapuputol ang itaas at ibaba.

### `project.png`: PROJECTS

```
Top-down view of a heist-style planning table at night: printed website wireframes, sticky notes, red string connecting pinned screenshots, a laptop showing a web page layout, a city map underneath, glowing city through the window. Main objects arranged across the horizontal middle band.
```

### `automation.png`: AUTOMATION (bago)

```
A neon-lit control room at night: a wall of screens showing connected workflow nodes and arrows, glowing cables linking a laptop, a phone with chat notifications and a spreadsheet on a tablet, small gears and lightning icons floating between them. Main objects arranged across the horizontal middle band.
```

### `stat.png`: PROFILE

```
A stylized character stats screen inside a garage at night: a large monitor showing skill bars and a radar, a gaming chair, a scooter helmet on the desk, warm light from a half-open garage door. Main objects arranged across the horizontal middle band.
```

### `role.png`: ROLES

```
Character-switch screen composition: three versions of the same young Filipino man side by side in three panels with colored borders (teal, green, orange): one as a software developer with a laptop, one as an automation engineer with a tablet showing workflow nodes, one as a QA tester with a checklist and magnifying glass. Faces and torsos in the horizontal middle band.
```

## Opsyonal

### `og.png`: link preview

Sukat: **1200 × 630**. Lumalabas kapag ibinahagi ang link sa Facebook, LinkedIn, o Messenger.

```
The same young Filipino man leaning on a dark grey maxi-scooter on a hill overlooking a sunset city skyline, wide shot, subject on the right half, large empty sky on the left half for a title.
```

## Font (opsyonal)

Gumagamit ang site ng Pricedown para sa malalaking title kapag nandoon ang file. Kung wala, Bebas Neue ang lalabas.

1. I-download ang Pricedown mula sa Typodermic Fonts (libre, may sariling license; basahin muna).
2. I-convert sa `.woff2` (halimbawa gamit ang isang woff2 converter).
3. I-save bilang `public/fonts/pricedown.woff2`.
