import { Bank } from 'Akila/utils';

const actx = new (window.AudioContext || window.webkitAudioContext)();

let sounds = new Bank("./sounds", ["sample1"], {extension: "mp3", mediaType: "audio", treatment: audio => {
  const source = actx.createMediaElementSource(audio);
  audio.source = source;
  return audio;
}});

let audio, gain;

sounds.load().then(() => {
  console.log("ready");
  btn.onclick = main;
});

const main = async () => {
  btn.onclick = () => {};
  actx.resume();

  audio = sounds.get("sample1");

  gain = actx.createGain();
  gain.gain.value = 0.1;

  audio.source.connect(gain);
  gain.connect(actx.destination);

  audio.play();
}
