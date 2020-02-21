const dico = new Worker("./DictionnaireWorker.js");

window.in.onkeyup = () => {
    dico.postMessage(window.in.value);
}

dico.onmessage = ({data}) => {
    if(data.value == "ready")
        window.ready.innerHTML = "ready";
    else
        window.out.innerHTML = data.value;
}
