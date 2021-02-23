const Graph = require('./Graph').Graph;
const GridGraph = require('./Graph').GridGraph;
const TSV = require('./TSV');
 
const tsv = new TSV();
tsv.addColumn('Sommets');
tsv.addColumn('Itérations');

// Q1
for(let i = 200; i <= 2000; i += 200) {
    const g = new Graph(i);
    g.randomArcs();
    console.log(g);
    
    let mean = g.testHitingTime(100, 0, g.getCount() - 1);
    
    console.log(i, mean);
    tsv.addTo('Sommets', i);
    tsv.addTo('Itérations', mean);
}

tsv.write('ex1q1');

tsv.cleanAllColumns();
// Q2
for(let i = 50; i <= 500; i += 50) {
    const g = new Graph(i);
    g.randomArcs();
    console.log(g);
    
    let mean = g.testCoverTime(100, 0);
    
    console.log(i, mean);
    tsv.addTo('Sommets', i);
    tsv.addTo('Itérations', mean);
}

tsv.write('ex1q2');

tsv.cleanAllColumns();

// Q3
for(let i = 20; i <= 200; i += 20) {
    const g = new Graph(i);
    g.pathArcs();
    console.log(g);
    
    let mean = g.testHitingTime(100, 0, g.getCount() - 1);
    
    console.log(i, mean);
    tsv.addTo('Sommets', i);
    tsv.addTo('Itérations', mean);
}

tsv.write('ex1q3');

tsv.cleanAllColumns();

// Q4
for(let i = 20; i <= 200; i += 20) {
    const g = new Graph(i);
    g.lolipopArcs();
    console.log(g);
    
    let mean = g.testCoverTime(100, 0);
    
    console.log(i, mean);
    tsv.addTo('Sommets', i);
    tsv.addTo('Itérations', mean);
}

tsv.write('ex1q4');

tsv.cleanAllColumns();

tsv.addColumn('Distance');

// Q5
for(let i = 2; i <= 40; ++i) {
    const g = new GridGraph(i, i);
    console.log(g);
    
    let mean = g.testHitingTime(100, g.coordToindex(0, 0), g.coordToindex(i, i));
    
    console.log(i, mean, g.dist(0, 0, i, i));
    tsv.addTo('Sommets', i);
    tsv.addTo('Itérations', mean);
    tsv.addTo('Distance', g.dist(0, 0, i, i));
}

tsv.write('ex1q5');

console.log('Fin de randomWalker');
