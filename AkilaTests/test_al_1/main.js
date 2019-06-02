import { Bank } from './Akila/utils.js';


import { MainMixer } from './Akila/kal.js';

const mm = new MainMixer();

MainMixer.setSample("pouet", 5);

/*
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

  let audio2 = document.createElement('audio');
  audio2.src = audio.src;

  gain = actx.createGain();
  gain.gain.value = 0.1;

  audio.source.connect(gain);
  gain.connect(actx.destination);

  audio.play();

  setTimeout(() => {
    let gain2 = actx.createGain();
  //gain2.gain.value = 1;

  audio2.source = actx.createMediaElementSource(audio2);

    audio2.play();
    console.log('alo');
  }, 1000);
}
*/
