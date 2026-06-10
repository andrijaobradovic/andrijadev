# PRD — AndrijaDev Portfolio

> Product Requirements Document. Opisuje ŠTA gradimo i ZAŠTO. Ne ulazi u tehnologije ni u strukturu baze (videti `Tech.md` i `DB.md`).

## 1. Pregled

AndrijaDev je lični portfolio i poslovna prezentacija web developera Andrije Obradovića. Cilj sajta je da promoviše njegove veštine i radove, ostavi profesionalan utisak na posetioce i pretvori ih u potencijalne klijente koji će ga kontaktirati radi ponude.

- **Vlasnik:** Andrija Obradović
- **Brend:** AndrijaDev (logo u tekstualnom obliku `andrija.dev`)
- **Tagline:** "Turning your ideas into web applications."
- **Ton komunikacije:** ozbiljan, korporativan, profesionalan.
- **Domen (planirano):** `andrija.dev` (još nije kupljen).

## 2. Ciljevi

1. Prikazati sposobnosti web developmenta kroz sam dizajn i kvalitet sajta.
2. Privući pažnju posetioca i zadržati je (efektan, moderan dizajn).
3. Predstaviti ponuđene usluge na jasan način.
4. Prikazati portfolio realnih projekata.
5. Omogućiti lak kontakt i upit za ponudu.

## 3. Ciljna publika

- Potencijalni klijenti (firme i pojedinci) kojima treba sajt ili web aplikacija.
- Posetioci koji procenjuju Andrijinu stručnost pre angažovanja.

## 4. Jezik

- Sajt je primarno na **engleskom** jeziku.
- Postoji prekidač za prevod na **srpski** u headeru (EN / SRB).
- Glavni jezik je engleski; srpski je dostupan kao alternativa.

### Dizajn prekidača jezika

- Sa leve strane natpis **EN**, sa desne strane **SRB**, a između klizač koji se pomera levo-desno.
- Kada je klizač levo (aktivan EN), desna strana svetli fluorescentno zelenom bojom (akcentna boja brenda).
- Kada je klizač desno (aktivan SRB), leva strana svetli fluorescentno zelenom bojom.

## 5. Stranice i sadržaj

### 5.1 Home

Glavna ulazna stranica, fokus na snažan prvi utisak i efektne animacije. Redosled sekcija:

1. **Landing / Hero** — naslov sa tagline-om, ilustracija (obrađena Andrijina fotografija), glavni CTA dugme **"Contact me"**, i statistika.
2. **Kratko o meni** — sažet uvod sa linkom ka About stranici.
3. **Tehnologije** — sekcija sa alatima i tehnologijama koje Andrija koristi.
4. **Izdvojeni projekti** — do 3 istaknuta projekta.

**Statistika u hero sekciji:**
- "1+ godina iskustva"
- "X projekata" (X = ukupan broj projekata, dinamički)

### 5.2 Services

Prikaz ponuđenih usluga. Cene se ne prikazuju — sve je "na upit".

Usluge:
1. Izrada web sajtova
2. Izrada web aplikacija
3. Dizajn
4. Održavanje
5. Ugradnja novih funkcija na postojeće sajtove
6. SEO

Svaka usluga ima ikonicu, naslov i kratak opis (1–2 rečenice).

Dodatno:
- Sekcija **"Proces rada"**: Konsultacija → Dizajn → Razvoj → Isporuka i podrška.
- Na dnu stranice **CTA** koji vodi ka kontakt formi.

### 5.3 Projects

- Lista svih projekata prikazanih kao kartice.
- Svaka kartica prikazuje: naslov, preview sliku početne stranice projekta, kratak opis i korišćene tehnologije.
- Klik na karticu otvara **live sajt projekta u novom tabu**.
- Očekivani broj projekata: 10–20.

**Istaknuti projekti (featured):**
- Najviše 3 projekta mogu biti istaknuta i prikazuju se na Home stranici.
- Ako je istaknutih više od 3, najstariji istaknuti automatski prestaje da bude istaknut.
- Ako je istaknutih manje od 3, lista se dopunjuje najnovijim projektima.
- Ako nema istaknutih, prikazuju se 3 najnovija projekta.
- Ako ukupno ima manje od 3 projekta, prikazuje se onoliko koliko ih ima.
- Stranica Projects prikazuje **sve** projekte (i istaknute i ostale).

### 5.4 About me

Profesionalna biografija. Sadrži:
- Obrađenu Andrijinu fotografiju.
- Obrazovanje: Matematički fakultet, Univerzitet u Beogradu.
- Iskustvo: interesovanje za development od srednje škole; profesionalno se bavi oko godinu dana.
- Glavne veštine: Bootstrap, Next.js, Typescript, dizajn i programski jezici.
- Ton: strogo profesionalan (bez ličnih detalja, bez timeline-a, bez preuzimanja CV-ja).

### 5.5 Contact

- Kontakt forma sa poljima: **Email, Ime, Naslov, Poruka**.
- Prikazane društvene mreže:
  - LinkedIn: https://www.linkedin.com/in/andrija-obradovic-1998ao/
  - Instagram: https://www.instagram.com/andrija_obradovic/
- Prikazana email adresa (bez broja telefona).
- Nakon uspešnog slanja: lepa potvrdna poruka (toast).
- Posetilac koji pošalje poruku dobija automatski odgovor (kada tehnički uslovi to dozvole):

  > Poštovani,
  >
  > Vaša poruka je uspešno primljena. Uskoro ću Vam odgovoriti.
  >
  > Srdačan pozdrav,
  > AndrijaDev

  (Auto-odgovor se šalje na jeziku koji je posetilac koristio na sajtu — engleski ili srpski.)

### 5.6 Blog (skriveno)

- Stranica/ruta postoji, ali je za sada **sakrivena iz navigacije**. Predviđena za buduće korišćenje.

## 6. Globalni elementi

- **Header:** logo `andrija.dev`, navigacija, prekidač jezika EN/SRB. Header ostaje zalepljen pri vrhu (sticky).
- **Footer:** copyright, linkovi, društvene mreže, email.
- **Navigacija:** Home, Services, Projects, About, Contact (Blog skriven).
- **404 stranica:** prilagođena, u stilu brenda.
- **Loading stanja:** prikazuju se dok se sadržaj učitava.
- **Responsivnost:** mobile-first, radi na svim uređajima.
- **Favicon:** neon-zeleni krug sa ljubičastim slovom "A".

## 7. Vizuelni identitet

- Tamna tema (bez prekidača za svetli/tamni režim).
- Paleta: tamno-ljubičasta pozadina + neon-zelena akcentna boja.
- Logo `andrija.dev` gde je deo `.dev` u neon-zelenoj boji.
- Efektne animacije pri skrolovanju i interakciji.

### Pozadina sajta

- Pozadina je **gradijent** koji prelazi iz crne u tamno-ljubičastu boju.
- Gradijent je **animiran i pomera se** (nije statičan/fiksiran) — boje se polako kreću i smenjuju, stvarajući živ utisak.
- Animacija je suptilna i kontinuirana, ne odvlači pažnju od sadržaja.
- Poštuje se podešavanje "reduced motion" (korisnicima koji su isključili animacije pozadina miruje).

## 8. Šta projekat NIJE (Non-goals)

- Nema prekidača za svetli/tamni režim.
- Nema admin panela (projekti se unose ručno).
- Nema prikaza cena.
- Nema sekcije sa utiscima klijenata (testimonials).
- Nema preuzimanja CV-ja.
- Nema broja telefona na sajtu.

## 9. Kriterijumi uspeha

- Sajt ostavlja snažan profesionalan prvi utisak.
- Posetilac lako razume šta Andrija nudi i kako da ga kontaktira.
- Projekti se jasno prikazuju i vode na žive sajtove.
- Sajt je brz, responzivan i dobro rangiran na pretraživačima.
