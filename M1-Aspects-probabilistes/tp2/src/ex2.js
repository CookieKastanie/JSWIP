const HeadsOrTails = require('./HeadsOrTails').HeadsOrTails;
const HeadsOrTailsPlayer = require('./HeadsOrTails').HeadsOrTailsPlayer;

// Q2
const hot = new HeadsOrTails();

//const p1 = new HeadsOrTailsPlayer(['P', 'F', 'P']);
//const p2 = new HeadsOrTailsPlayer(['P', 'P', 'P']);

const p1 = new HeadsOrTailsPlayer(['F', 'P', 'P']);
const p2 = new HeadsOrTailsPlayer(['P', 'P', 'P']);

hot.addPlayer(p1);
hot.addPlayer(p2);

for(let i = 0; i < 500; ++i) hot.playGame();

console.log('P1:', p1.getWinCount(), 'victoires');
console.log('P2:', p2.getWinCount(), 'victoires');
