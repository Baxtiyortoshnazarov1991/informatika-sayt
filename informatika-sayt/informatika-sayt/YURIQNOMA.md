# Informatika sayti — to'liq ishga tushirish yo'riqnomasi

Bu yo'riqnoma saytni **kompyuteringizda ko'rishdan** boshlab, **internetga chiqarish** va **domen ulashgacha** hammasini qadamma-qadam tushuntiradi. Hosting va domen sotib olish shart emas.

---

## 1. Loyiha tarkibi

```
informatika-sayt/
├── index.html      ← asosiy sahifa (barcha matnlar shu yerda)
├── style.css       ← dizayn
├── script.js       ← interaktivlik (rejim, konvertor, test)
└── YURIQNOMA.md    ← shu yo'riqnoma
```

Bu **statik sayt**: server, ma'lumotlar bazasi yoki o'rnatish kerak emas. Faqat brauzer yetarli.

---

## 2. Kompyuterda ko'rish (lokal)

**Eng oson usul:** `index.html` faylini ikki marta bosing, brauzerda ochiladi.

**Server bilan ochish (ixtiyoriy):**

- Python o'rnatilgan bo'lsa, papka ichida terminal oching:
  ```
  python -m http.server 8000
  ```
  So'ng brauzerda `http://localhost:8000` manziliga kiring.
- Yoki VS Code'da **Live Server** kengaytmasini o'rnating va `index.html` ustida "Open with Live Server" ni tanlang.

---

## 3. Internetga chiqarish — BEPUL (domen va hosting sotib olmasdan)

Quyidagi variantlardan **bittasini** tanlang. Boshlovchi uchun eng oson: **Netlify Drop**.

### Variant A: Netlify Drop (eng oson, 2 daqiqa)

1. https://app.netlify.com/drop sahifasiga kiring (ro'yxatdan o'tish talab qilinishi mumkin: Google/GitHub/email).
2. `informatika-sayt` **papkasini** (zip emas, papkaning o'zini) sahifadagi belgilangan joyga sudrab tashlang.
3. Bir necha soniyadan keyin sizga manzil beriladi, masalan: `https://tasodifiy-nom.netlify.app`
4. Manzilni o'zgartirish: **Site configuration → Change site name** ga kiring va masalan `informatika-uz` deb yozing. Yangi manzil: `https://informatika-uz.netlify.app`

Saytni yangilash: o'zgartirilgan papkani yana **Deploys** bo'limiga sudrab tashlang.

### Variant B: GitHub Pages

1. https://github.com saytida ro'yxatdan o'ting.
2. Yangi repozitoriy yarating: **New repository** → nomi `informatika-sayt`, **Public** tanlang.
3. **uploading an existing file** havolasini bosing va `index.html`, `style.css`, `script.js` fayllarini yuklang → **Commit changes**.
4. **Settings → Pages** bo'limiga kiring.
5. **Source:** `Deploy from a branch`, **Branch:** `main` va papka `/ (root)` ni tanlang → **Save**.
6. 1-3 daqiqadan keyin manzil chiqadi: `https://GITHUB_NOMINGIZ.github.io/informatika-sayt/`

### Variant C: Cloudflare Pages

1. https://dash.cloudflare.com ga kirib, ro'yxatdan o'ting.
2. **Workers & Pages → Create → Pages → Upload assets** ni tanlang.
3. Loyiha nomini yozing (masalan, `informatika-uz`), papkani yuklang va **Deploy** bosing.
4. Manzil: `https://informatika-uz.pages.dev`

### Qaysi birini tanlash kerak?

| Variant | Qiyinligi | Manzil ko'rinishi |
|---|---|---|
| Netlify Drop | Juda oson | nom.netlify.app |
| GitHub Pages | O'rtacha | nom.github.io/sayt |
| Cloudflare Pages | O'rtacha | nom.pages.dev |

Topshiriqda "domenini ayting" deyilsa, shu tayyor manzilni (masalan `informatika-uz.netlify.app`) bering. Bu ham haqiqiy, ishlaydigan domen.

---

## 4. O'z domeningizni ulash (ixtiyoriy, pullik)

Agar topshiriqda aniq `.uz` yoki `.com` domen talab qilinsa:

### 4.1. Domen sotib olish

- `.uz` domen: rasmiy registratorlar orqali (cctld.uz saytida ro'yxati bor).
- `.com`, `.site`, `.xyz` va boshqalar: Namecheap, Porkbun, GoDaddy.
- Narxlar o'zgarib turadi, sotib olishdan oldin saytda tekshiring.

### 4.2. Netlify'ga ulash

1. Netlify'da saytingizni oching: **Domain management → Add a domain**.
2. Domeningizni yozing (masalan `informatika.uz`).
3. Netlify sizga DNS yozuvlarini ko'rsatadi. Odatda:
   - Asosiy domen uchun **A** yoki **ALIAS** yozuvi
   - `www` uchun **CNAME** yozuvi: `informatika-uz.netlify.app` ga
4. Domen registratoringizning **DNS sozlamalari** bo'limiga kirib, shu yozuvlarni qo'shing (aniq qiymatlarni Netlify ekranidan oling).
5. DNS yangilanishi 10 daqiqadan 24-48 soatgacha vaqt olishi mumkin.
6. Netlify avtomatik bepul **HTTPS (SSL)** sertifikat beradi: **Domain management → HTTPS → Verify DNS configuration**.

### 4.3. GitHub Pages'ga ulash

1. **Settings → Pages → Custom domain** maydoniga domenni yozing → **Save**.
2. Registratorda DNS yozuvlarini qo'shing:
   - Asosiy domen uchun 4 ta **A** yozuvi (GitHub hujjatida ko'rsatilgan IP-manzillar: https://docs.github.com/pages)
   - `www` uchun **CNAME**: `GITHUB_NOMINGIZ.github.io`
3. **Enforce HTTPS** katagini belgilang.

---

## 5. Saytni o'zgartirish bo'yicha maslahatlar

| Nimani o'zgartirmoqchisiz | Qaysi faylda |
|---|---|
| Matnlar, bo'limlar, sarlavhalar | `index.html` |
| Ranglar | `style.css` ning boshidagi `:root { --primary: ... }` |
| Test savollari | `script.js` dagi `questions` massivi |
| Sayt nomi va tavsifi | `index.html` dagi `<title>` va `<meta name="description">` |

**Yangi test savoli qo'shish** (`script.js`):

```js
{ q: "Savol matni?", o: ["Variant 1", "Variant 2", "Variant 3", "Variant 4"], a: 2 }
```

Bu yerda `a` — to'g'ri javobning tartib raqami (0 dan boshlanadi: 0=birinchi, 1=ikkinchi...).

**Yangi bo'lim qo'shish:**
1. `index.html` da boshqa `<section id="...">` ni nusxalab, yangi `id` va matn bering.
2. Tepadagi `<nav>` ichiga `<a href="#yangi-id">Nomi</a>` qo'shing.

---

## 6. Ko'p uchraydigan muammolar

| Muammo | Yechim |
|---|---|
| Sayt dizaynsiz (faqat matn) ochilyapti | `style.css` va `index.html` **bir papkada** ekanini tekshiring; fayl nomlari aynan shunday bo'lsin |
| Netlify'da "Page not found" | Papkaning ichiga emas, **papkaning o'zini** tashlang; `index.html` ildizda bo'lishi shart |
| GitHub Pages ochilmayapti | 3 daqiqa kuting; **Settings → Pages** da manzil chiqqanini tekshiring; repozitoriy Public bo'lsin |
| Domen ulangandan keyin ochilmayapti | DNS yangilanishini kuting (24 soatgacha); yozuvlarda xato yo'qligini tekshiring |
| O'zgartirishlar ko'rinmayapti | Brauzerda `Ctrl + F5` bosing (keshni tozalash) |
| Harflar noto'g'ri ("ʻ" belgilari buzilgan) | Fayllar **UTF-8** kodlashda saqlangan bo'lsin |

---

## 7. Topshiriqqa topshirish uchun qisqa checklist

- [ ] Sayt internetda ochiladi (telefonda ham tekshirdim)
- [ ] Barcha bo'limlar va menyu havolalari ishlaydi
- [ ] Konvertor va test ishlaydi
- [ ] Domen/manzilni topshiriqda ko'rsatdim
- [ ] Sayt nomi, tavsifi va muallif ma'lumotini o'zimga moslab o'zgartirdim

---

## 8. Keyingi versiyalar uchun g'oyalar

- Bo'limlarga rasm va diagrammalar qo'shish
- Dasturlash bo'yicha alohida sahifa (Python, HTML/CSS darslari)
- Test savollarini ko'paytirish va natijalarni saqlash
- Qidiruv maydoni
- Kontakt shakli (Netlify Forms yoki Formspree orqali, bepul)
- O'zbek / rus / ingliz tillari almashtirgichi
