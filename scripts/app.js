// 3. Krepšinis. Prieš krepšinio varžybas komandos vadovas registruoja 12 žaidėjų. 
// Krepšinio varžybų metu sekretorius fiksuoja kas (žaidėjo numeris) ir kiek pelno 
// taškų (taškų skaičius). Jeigu žaidėjas metė, tačiau nepataikė – rašomas 0.

// Parašykite programą, kuri lentelėje pateiktų tokią varžybų statistiką: žaidėjo numerį,
// jo vardą, pavardę, įmestų baudų skaičių (po 1 tašką), dvitaškių skaičių (2), tritaškių
// skaičių (3), iš viso žaidėjo surinktų taškų skaičių ir bendrą metimų tikslumą procentais
// (0 reiškia, jog žaidėjas metė, tačiau nepataikė). Taip pat nustatytų: pelniusį daugiausią 
// taškų, įmetusį daugiausią tritaškių ir taikliausią žaidėją.

// Faile zaidejai.txt pateiktas 12-kos registruotų žaidėjų sąrašas: atskirose eilutėse įrašomas
// žaidėjo numeris, jo vardas ir pavardė (25 simboliai).
// Duomenų faile taskai.txt saugoma tokia informacija: žaidėjo numeris (nuo 1 iki 100) ir pelnytų taškų
// skaičius (0, 1, 2 arba 3), tam skiriama viena teksto eilutė. Faile gali būti ne daugiau kaip 100-as įrašų.

// Rezultatų faile suvestine.txt pateikiama lentelė:
// Nr.
// Vardas Pavardė
// Baudų metimų skaičius
// Dvitaškių metimų skaičius
// Tritaškių metimų skaičius
// Surinkti taškai
// Nepataikytų metimų skaičius
// Tikslumas

// Suvestinėje žaidėjai išrikiuoti nuo didžiausią numerį turinčio žaidėjo iki mažiausią numerį 
// turinčio žaidėjo. Po lentele pateikite geriausius žaidėjus: numerį, vardą, pavardę ir geriausią 
// rodyklį. Jeigu yra keli geriausi žaidėjai, spausdinti vieną iš jų.

// Reikalavimai programai:
// 1. duomenims saugoti sukurti įrašo tipo masyvą(-us);
// 2. sukurti vieną arba dvi duomenų skaitymo iš dviejų failų funkcijas (procedūras);
// 3. sukurti funkciją, kuri skaičiuoja surinktus taškus;
// 4. sukurti funkciją, kuri skaičiuoja metimų tiklsumą;
// 5. sukurti funkciją (procedūrą) rikiuoti įrašų masyvą pagal žaidėjo numerius;
// 6. sukurti geriausių žaidėjų atrankos funkciją (procedūrą);
// 7. sukurti rezultatų rašymo į failą funkciją (procedūrą).


// Ne pagal uzduotas uzduotis, bet tikslas buvo pasimokinti promise ir async/await

"use strict";

import { prepareData } from "./prepare-data.js";
import { getStats } from "./process-data.js";
import { writeDataFile } from "./write-file.js";

prepareData()
  .then((rawData) => {
    const stats = getStats(rawData);
    return stats;
  })
  .then((stats) => {
    writeDataFile(stats);
  })
  .catch((error) => {
    console.error(error)
  })