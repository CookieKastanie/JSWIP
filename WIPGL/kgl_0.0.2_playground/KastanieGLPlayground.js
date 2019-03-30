let loadKastanieGLPlayground = async () => {
  loadKastanieGLPlayground = async () => {
    return new Promise((resolve, reject) => {
      console.error("loadKastanieGLPlayground n'est plus valide");
      reject();
    });
  }

  return new Promise((resolve, reject) => {
    if(typeof loadKastanieGL != 'function') throw "KastanieGLPlayground à besoin de KastanieGL pour fonctionner !";

    const liste = ["Camera.js"];

    let nb = 0;

    const reg = new RegExp('KastanieGLPlayground.js', 'g');
    const scripts = document.getElementsByTagName('script');
    for (let i in scripts) {
      let s = scripts[i];

      if(s.src.match(reg)){

        let path = s.src.split('/');
        path.splice(-1,1);
        path = path.join('/');

        const p = s.parentNode;

        for (let file of liste) {
          const script = document.createElement('script');
          script.src = path + '/' + file;
          script.onload = () => {
            if(++nb == liste.length) loadKastanieGL().then(() => { resolve() }).catch(() => { reject() });
          }
          p.insertBefore(script, s.nextSibling);
        }

        break;
      }
    }
  });
}
