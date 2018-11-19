let loadKastanieGL = (main) => {
  if(typeof main != 'function'){
    console.error("Le paramètre n'est pas une fonction");
    return;
  }

  const liste = ["Display.js", "Shader.js", "DataBuffers.js", "FrameBuffer.js", "Texture.js", "VAO.js", "ObjParser.js", "Matrix4.js", "Bank.js"];

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
          if(++nb == liste.length) main();
        }
        p.insertBefore(script, s.nextSibling);
      }

      break;
    }
  }

  loadKastanieGL = () => {
    console.error("loadKastanieGL n'est plus valide");
  }
}
