import * as fs from "fs";

interface EgyKepviselo {
    vnev: string;
    unev: string;
    korzet: string;
    part: string;
    szavazat: number;
}

const kepviselo: EgyKepviselo[] = new Array<EgyKepviselo>(100);
let n: number;
const osszesszavazat: number = 0;
const valasztokszama: number = 12345;

function Feladat1(): void {
    const olvaso: fs.ReadStream = fs.createReadStream("szavazatok.txt");
    let egysor: string[] = new Array<string>(5);
    console.log("1. feladat. Az adatok beolvasása");
    n = 0;
    olvaso.on("data", (chunk: Buffer) => {
        const lines: string[] = chunk.toString().split("\n");
        lines.forEach((line: string) => {
            egysor = line.split(" ");
            kepviselo[n].korzet = egysor[0];
            kepviselo[n].szavazat = parseInt(egysor[1]);
            kepviselo[n].vnev = egysor[2];
            kepviselo[n].unev = egysor[3];
            kepviselo[n].part = egysor[4];
            n++;
        });
    });
    olvaso.on("end", () => {
        console.log("Adatok beolvasva");
    });
}

function Feladat2() {
    console.log(`2. feladat. A helyhatósági választáson ${n} képviselőjelölt indult.`);
}

function Feladat3() {
    console.log("3. feladat. Egy képviselő");
    console.log("vezetékneve=");
    const veznev = readlineSync.question();
    console.log("utóneve=");
    const utonev = readlineSync.question();
    let szerepel = false;
    for (let i = 0; i < n; i++) {
        if (kepviselo[i].vnev == veznev && kepviselo[i].unev == utonev) {
            console.log(`${veznev} ${utonev} képviselőjelölt ${kepviselo[i].szavazat} szavazatot kapott.`);
            szerepel = true;
        }
    }
    if (!szerepel) console.log("Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!");
}

function Feladat4(): void {
    let osszesszavazat: number = 0;
    for (let i: number = 0; i < n; i++) {
        osszesszavazat += kepviselo[i].szavazat;
    }
    const arany: number = (osszesszavazat / valasztokszama) * 100;
    console.log(`4. feladat. A választáson ${osszesszavazat} állampolgár, a jogosultak ${arany.toFixed(2)}%-a vett részt.`);
}

function Feladat5(): void {
    let gyep: number = 0;
    let hep: number = 0;
    let tisz: number = 0;
    let zep: number = 0;
    let flen: number = 0;
    for (let i: number = 0; i < n; i++) {
        if (kepviselo[i].part == "GYEP") {
            gyep += kepviselo[i].szavazat;
        }
        if (kepviselo[i].part == "HEP") {
            hep += kepviselo[i].szavazat;
        }
        if (kepviselo[i].part == "TISZ") {
            tisz += kepviselo[i].szavazat;
        }
        if (kepviselo[i].part == "ZEP") {
            zep += kepviselo[i].szavazat;
        }
        if (kepviselo[i].part == "-") {
            flen += kepviselo[i].szavazat;
        }
    }
    console.log(`5. feladat. Az egyes pártokra leadott szavazatok aránya:`);
    console.log(`Gyümölcsevők Pártja = ${((100 * gyep) / osszesszavazat).toFixed(2)}%`);
    console.log(`Húsevők Pártja = ${((100 * hep) / osszesszavazat).toFixed(2)}%`);
    console.log(`Tejivók Szövetsége = ${((100 * tisz) / osszesszavazat).toFixed(2)}%`);
    console.log(`Zöldségevők Pártja = ${((100 * zep) / osszesszavazat).toFixed(2)}%`);
    console.log(`Független jelöltek = ${((100 * flen) / osszesszavazat).toFixed(2)}%`);
}

function Feladat6(): void {
    let max: number = kepviselo[0].szavazat;
    for (let i: number = 1; i < n; i++) {
        if (max < kepviselo[i].szavazat) {
            max = kepviselo[i].szavazat;
        }
    }
    console.log("6. feladat. A legtöbb szavazatot kapott képviselő(k):");
    for (let i: number = 0; i < n; i++) {
        if (kepviselo[i].szavazat == max) {
            console.log(kepviselo[i].vnev + " " + kepviselo[i].unev + " ");
            if (kepviselo[i].part == "-") {
                console.log("független");
            } else {
                console.log(kepviselo[i].part);
            }
        }
    }
}

function Feladat7(): void {
    const fs = require("fs");
    const iro = fs.createWriteStream("kepviselok.txt");
    console.log("7. feladat. A választás eredményének kiírása");
    for (let i = 1; i <= 8; i++) {
        let elso = true;
        let max = 0;
        let maxh = 0;
        for (let j = 0; j < n; j++) {
            if (kepviselo[j].korzet === i.toString()) {
                if (elso) {
                    maxh = j;
                    max = kepviselo[j].szavazat;
                    elso = false;
                } else {
                    if (kepviselo[j].szavazat > max) {
                        maxh = j;
                        max = kepviselo[j].szavazat;
                    }
                }
            }
        }
        iro.write(i.toString() + " " + kepviselo[maxh].vnev + " " + kepviselo[maxh].unev + " ");
        if (kepviselo[maxh].part === "-") {
            iro.write("független\n");
        } else {
            iro.write(kepviselo[maxh].part + "\n");
        }
    }
    iro.close();
}
Feladat1();
Feladat2();
Feladat3();
Feladat4();
Feladat5();
Feladat6();
Feladat7();
