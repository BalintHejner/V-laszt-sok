export default class Képviselők {
    kerület: number;
    szavazatok: number;
    #vnév: string;
    #knév: string;
    #pártjel: string;

    get vnev(): string {
        return this.#vnév;
    }
    get knev(): string {
        return this.#knév;
    }

    get partjel(): string {
        return this.#pártjel;
    }

    get nev(): string {
        return this.#vnév + "" + this.#vnév;
    }

    get partneve(): string {
        return this.#vnév;
    }

    get partjel2(): string {
        const fuggetlen: string = "Független";
        if (this.#pártjel == "-") return fuggetlen;
    }
}
