let loadKastanieGL = async () => {
  loadKastanieGL = async () => {
    return new Promise((resolve, reject) => {
      console.error("loadKastanieGL n'est plus valide");
      reject();
    });
  }

  return new Promise(resolve => {
    const liste = ["Display.js", "Shader.js", "BufferObject.js", "FrameBuffer.js", "Texture.js", "VAO.js", "Matrix4.js", "Parser.js"];

    let nb = 0;

    const reg = new RegExp('KastanieGL.js', 'g');
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
