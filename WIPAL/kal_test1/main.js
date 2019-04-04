const actx = new (window.AudioContext || window.webkitAudioContext)();
let sounds = new Bank("./sounds", ["sample1"], {extension: "mp3", mediaType: "arrayBuffer", treatment: buffer => {
  return actx.decodeAudioData(buffer);
}});

let source, gain;

sounds.load().then(() => {
  console.log("oui");
  btn.onclick = main;
});

const main = async () => {
  btn.onclick = () => {}
  actx.resume();
  source = actx.createBufferSource();

  source.buffer = sounds.get("sample1");

  gain = actx.createGain();
  gain.gain.value = 0.1;

  source.connect(gain);
  gain.connect(actx.destination);

  source.start(0);
}
