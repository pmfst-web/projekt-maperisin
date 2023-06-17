# Evidencija aktivnosti
## 09.06.2023.
Pocetak | Kraj
------- | ----
18:00   | 03:30
### Kratki opis promjena
Definirani su sljedeći zahtjevi aplikacije:
- Struktura početnog ekrana aplikacije je napravljena.
- Dodan je header koji sadrži naziv aplikacije i "menu" ikonu sa padajućim izbornikom.
- Padajući izbornik se otvara kada korisnik pritisne na ikonu "menu".
- Kada je izbornik otvoren, dodana je funkcionalnost da se zatvori prilikom dodira bilo gdje drugdje na ekranu(zatvaranje izvan izbornika).
- Implementirane su funkcionalnosti za postavljanje dnevnog cilja, koja trenutno ne funkcionira kako je zamišljeno
- Omogućen je unos konzumirane količine vode.
- Unos konzumirane količine vode je omogućen putem čaše (200ml), boce (500ml) ili ručnog unošenja u obliku litara.
- Dodana je funkcionalnost za ažuriranje unesene količine vode.
- Implementirane su funkcionalnosti "resetiranja" unesene dnevne količine na 0.
- Dodana je funkcionalnost za brisanje prethodno dodane količine u slučaju pogrešnog unosa.

Ove promjene i funkcionalnosti pružaju korisnicima mogućnost postavljanja dnevnog cilja i unošenja dnevne konzumacije vode na intuitivan način. Također, zatvaranje izbornika prilikom dodira bilo gdje drugdje na ekranu poboljšava korisničko iskustvo i olakšava navigaciju kroz aplikaciju.

## 10.06.2023
Pocetak | Kraj
------- | ----
10:00   | 23:00
### Kratki opis promjena
- Umjesto padajućeg izbornika, dodan je novi pristup za navigaciju -> tab navigatori koji se nalaze na dnu ekrana. Na taj način je ostvarena navigacija između početnog ekrana i ekrana sa statistikom
- Na početnom ekranu dodan je gumb "Postavi cilj", koji otvara modal komponentu -> prikazuje sadržaj u posebnom prozoru koji se postavlja iznad glavnog dijela aplikacije. U prozoru se nalazi sadržaj za unos dnevnog cilja, te gumb za spremanje ili odbacivanje
- Dodana je i funkcionalnost koja prati je li korisnik ostvario želejni cilj. U slučaju da je korisnik ostvario cilj, na dnu ekrana se ispisuje poruka: "Čestitamo ostvarili ste željeni cilj!"

## 11.06.2023
Pocetak | Kraj
------- | ----
10:00   | 23:00
### Kratki opis promjena
- Dodana funkcionalnost koja prati kada je dan završio te sprema taj dan sa unesenom količinom vode u povijest i restira unesenu količinu vode na 0 za novi dan
- Omogućen prikaz povijesti na ekranu Statistika, trenutno samo testni podaci


## 16.06.2023
Pocetak | Kraj
------- | ----
13:00   | 22:00
### Kratki opis promjena
- Na početni ekran dodan gumb "Odaberi datum" pomoću kojeg se otvara kalendar te korisnik može izabrati 
željeni datum 
- Također, dodana je nova komponenta Kalendar, dodana je i funkcija kako se nebi mogli odabrati budući datumi već samo trenutni i prethodni

