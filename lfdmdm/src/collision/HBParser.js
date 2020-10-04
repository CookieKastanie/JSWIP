export class HBParser {
    static getLoop(file) {
        const lines = file.split('\n').map(l => l.split(/(\s+)/).filter(s => s.trim().length > 0));

        const verts = new Array();
        for (let line of lines) {
            switch (line[0]) {
                case "v":
                    const x = parseFloat(line[1]);
                    const y = parseFloat(line[2]);
                    const a = Math.atan2(y, x);
                    verts.push({x, y, a});
                break;
            }
        }

        verts.sort((a, b) => a.a - b.a);

        const final = new Array();

        for(let v of verts) {
            final.push(v.x);
            final.push(v.y);
        }

        return final;
    }

    static getEdges(file) {
        const lines = file.split('\n').map(l => l.split(/(\s+)/).filter(s => s.trim().length > 0));

        const verts = new Array();
        const edges = new Array();

        for (let line of lines) {
            switch (line[0]) {
                case "v":
                    verts.push({
                        x: parseFloat(line[1]),
                        y: parseFloat(line[2])
                    });
                break;

                case "l":
                    edges.push({
                        vert1: parseInt(line[1]) - 1,
                        vert2: parseInt(line[2]) - 1,
                    });
                break;
            }
        }


        const final = new Array();
        for(const e of edges) {
            const p1 = verts[e.vert1];
            const p2 = verts[e.vert2];

            final.push([
                p1.x, p1.y,
                p2.x, p2.y
            ]);
        }

        return final;
    }
}
