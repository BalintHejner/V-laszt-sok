import Képviselők from "./Képviselők";
import fs from "fs";

export default class Megoldás {
    #kepviselok: Képviselők[] = [];

    get kepviselokSzama(): number {
        return this.#kepviselok.length;
    }

    get reszveteliStatisztika(): string {
        return `A választásokon ${this.#osszSzavazat} állampolgár, a jogosultak ${this.#szavazatArany}-a vett részt.`;
    }

    szavazatok: number = 0;
    get #osszSzavazat(): number {
        for (const szavazat of this.#kepviselok) {
            this.szavazatok += szavazat.szavazatok;
        }
        return this.szavazatok;
    }

    get #szavazatArany(): string {
        return `${((this.#osszSzavazat / 12345) * 100).toFixed(2)} %`;
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

    szavazatokSzama(kepviseloNev: string): string {
        this.#kepviselok.forEach(item => {
            if (item.nev == kepviseloNev) {
                return `${kepviseloNev} ${item.szavazatok} szavazatot kapott!`;
            }
        });
        return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";

        // for (const kepviseloNeve of this.#kepviselok) {
        //     if (kepviseloNeve.nev == kepviseloNev) {
        //         return `${kepviseloNev} ${kepviseloNeve.szavazatok} szavazatot kapott!`;
        //     }
        // }
        // return "Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";
    }
}
