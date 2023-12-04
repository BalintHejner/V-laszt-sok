// import VálasztásiEredmény from "./Képviselők";
import Képviselők from "./Képviselők";
import fs, { WriteStream } from "fs";

export default class Megoldás {
    #kepviselok: Képviselők[] = [];

    get kepviselokSzama(): number {
        return this.#kepviselok.length;
    }

    get reszveteliStatisztika(): string {
        return `A választásokon ${this.#osszSzavazat} állampolgár, a jogosultak ${this.#szavazatArany}-a vett részt.`;
    }

    get #osszSzavazat(): number {
        let szavazatok: number = 0;
        for (const szavazat of this.#kepviselok) {
            szavazatok += szavazat.szavazatok;
        }
        return szavazatok;
    }

    get #szavazatArany(): string {
        return `${((this.#osszSzavazat / 12345) * 100).toFixed(2)} %`;
    }

    get #maxszavazat(): number {
        let max: number = -1;
        for (const e of this.#kepviselok) {
            if (e.szavazatok > max) max = e.szavazatok;
        }
        return max;
    }

    get hatodikKiiras(): string {
        let kiir: string = "";
        for (const e of this.#kepviselok) {
            if (e.szavazatok == this.#maxszavazat) {
                kiir += `${e.nev} ${e.pártJel2} \n`;
            }
        }
        return kiir;
    }

    get #partok(): Map<string, number> {
        const szotar: Map<string, number> = new Map<string, number>();
        this.#kepviselok.forEach(tag => {
            if (!szotar.has(tag.párt)) {
                szotar.set(tag.párt, tag.szavazatok);
            } else {
                const oldValue: number = szotar.get(tag.párt) as number;
                const newValue: number = oldValue + tag.szavazatok;
                szotar.set(tag.párt, newValue);
            }
        });
        return szotar;
    }

    get partStat(): string {
        let vissza: string = "";
        this.#partok.forEach((value, key) => {
            vissza += `${key} = ${((value / this.#osszSzavazat) * 100).toFixed(2)} %\n`;
        });
        return vissza;
    }

    get kiiras(): WriteStream {
        const iro = fs.createWriteStream("kepviselok.txt");
        for (let i = 1; i <= 8; i++) {
            let elso = true;
            let max = 0;
            let maxh = 0;
            for (let j = 0; j < this.#kepviselok.length; j++) {
                if (this.#kepviselok[j].kerület === i) {
                    if (elso) {
                        maxh = j;
                        max = this.#kepviselok[j].szavazatok;
                        elso = false;
                    } else {
                        if (this.#kepviselok[j].szavazatok > max) {
                            maxh = j;
                            max = this.#kepviselok[j].szavazatok;
                        }
                    }
                }
            }
            iro.write(i.toString() + ".kerület:" + " " + this.#kepviselok[maxh].nev + " ");
            iro.write(this.#kepviselok[maxh].pártJel2 + "\n");
        }
        iro.close();
        return iro;
    }

    constructor(forrás: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const temp = fs.readFileSync(forrás).toString();
        // const temp = fs.readFileSync(forrás, "utf8");
        fs.readFileSync(forrás, "utf8")
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length > 0) this.#kepviselok.push(new Képviselők(aktSor));
            });
    }

    // #nyertesKépviselő(kerület: number): VálasztásiEredmény | null {
    //     let nyertes: VálasztásiEredmény | null = null;
    //     for (const e of this.#kepviselok) {
    //         if (e.kerület == kerület) {
    //             if (e.kerület == null) {
    //                 nyertes = e;
    //             } else {
    //                 if (e.szavazatok > nyertes.szavazatok) {
    //                     nyertes = e;
    //                 }
    //             }
    //         }
    //     }
    //     return nyertes;
    // }

    szavazatokSzama(kepviseloNev: string): string {
        // this.#kepviselok.forEach(item => {
        //     if (item.nev == kepviseloNev) {
        //         return `${kepviseloNev} ${item.szavazatok} szavazatot kapott!`;
        //     }
        // });
        // return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";

        for (const kepviseloNeve of this.#kepviselok) {
            if (kepviseloNeve.nev == kepviseloNev) {
                return `${kepviseloNev} ${kepviseloNeve.szavazatok} szavazatot kapott!`;
            }
        }
        return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";
    }
}
