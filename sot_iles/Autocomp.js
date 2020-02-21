class Autocomp {
    constructor(iles, max = 10) {
        this.iles = iles;
        this.max = max;
    }

    verify(search) {
        search = search.toLowerCase();

        const result = new Array();

        for(const ile of this.iles) {
            const name = ile.name.toLowerCase();
            if(name.includes(search)) result.push(ile);
        }

        return result.slice(0, this.max);
    }
}
