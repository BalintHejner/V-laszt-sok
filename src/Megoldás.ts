import Képviselők from "./Képviselők";
import fs from "fs";

export default class Megoldás {
    #kepviselok: Képviselők[] = [];

    get szavazatokSzama(): number {
        return this.#kepviselok.length;
    }

    constructor(forrás: string) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const temp = fs.readFileSync(forrás).toString();
        // const temp = fs.readFileSync(forrás, "utf8");
        fs.readFileSync(forrás, "utf8")
            .split("\n")
            .forEach(sor => {
                const aktSor: string = sor.trim();
                if (aktSor.length > 0) this.#kepviselok.push(new Képviselők());
            });
    }
}
