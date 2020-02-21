importScripts("./Dictionnaire.js");

const dico = new Dictionnaire();

fetch('./dico.txt').then(data => data.text()).then(file => {
    dico.fromFile(file);
    postMessage({
        type: "state",
        value: "ready"
    });
});

onmessage = ({data}) => {
    postMessage({
        type: "result",
        value: dico.verify(data)
    });
}
