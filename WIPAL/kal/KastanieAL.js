let loadKastanieAL = async () => {
  loadKastanieAL = async () => {
    return new Promise((resolve, reject) => {
      console.error("loadKastanieAL n'est plus valide");
      reject();
    });
  }

  return new Promise(resolve => {
    const liste = [""];

    let nb = 0;

    const reg = new RegExp('KastanieAL.js', 'g');
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
            if(++nb == liste.length) resolve();
          }
          p.insertBefore(script, s.nextSibling);
        }

        break;
      }
    }
  });
}
