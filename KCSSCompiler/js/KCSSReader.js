/*


<sequence> -> [ <var> | <block> | <blockMedia> ]
<var> ->  $ <nom> ( : <valeur> )
<block> ->  ( . | # | : ) <tag> { [ <attribut> | <block> ] }
<attribut> ->  <nomProp> : [ <valeur> | <var> ]
<blockMedia> ->  @ <nom> { [ <block> ] }
<nom> ->  *
<valeur> ->  * ; | \n



*/


class Words {
  static tagExist(tag){
    for (let t of Words.tags) {
      if(tag == t) return true;
    }

    return false;
  }

  /*
    return:
    0 -> n'existe pas
    1 -> simple
    2 -> avec params
  */
  static pseudoElementsExist(elem){
    for (let t of Words.pseudoElements) {
      if(elem === t) return 1;
    }

    for (let t of Words.pseudoElementsParam) {
      if(elem === t) return 2;
    }

    return 0;
  }

  static isSeparator(sep){
    for (let t of Words.separators) {
      if(sep === t) return true;
    }

    return false;
  }

  static propertieExist(prop){
    for (let t of Words.properties) {
      if(prop === t) return true;
    }

    return false;
  }

  static attributCharExist(c){
    for (let t of Words.inAttribut) {
      if(c === t) return true;
    }

    return false;
  }

  static paramCharExist(p){
    for (let t of Words.inParams) {
      if(p == t) return true;
    }

    return false;
  }
}

Words.tags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup",
"datalist","dd","del","dfn","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","head","header","h1","h2","h3","h4","h5","h6",
"hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","meta","meter","nav","noscript","object","ol","optgroup","option","p","param",
"pre","progress","q","s","samp","script","section","select","small","source","span","strike","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","time","title",
"tr","u","ul","var","video","wbr","*"];

Words.pseudoElements = ["active",":after",":before","checked","disabled","empty","enabled","first-child",":first-letter",":first-line","first-of-type","focus","hover","in-range","invalid",
"last-child","last-of-type","link","only-of-type","only-child","optional","out-of-range","read-only","read-write","required","target","valid","visited","root",":selection"
];

Words.pseudoElementsParam = ["lang","not","nth-child","nth-last-child","nth-last-of-type","nth-of-type"];

Words.inParams = ["+", "-", " "];

Words.separators = [","," ",">","+","~"];

Words.inAttribut = ["=","~","|","^","$","*","_",".","\"","'"," "];

Words.properties = ["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","@charset","clear","clip","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","font","@font-face","font-family","font-feature-settings","@font-feature-values","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","image-rendering","@import","isolation","justify-content","@keyframes","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","max-height","max-width","@media","min-height","min-width","mix-blend-mode","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","Specifies what happens if content overflows an element's box","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","perspective","perspective-origin","pointer-events","position","quotes","resize","right","tab-size","table-layout","text-align","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-justify","text-orientation","text-overflow","text-shadow","text-transform","text-underline-position","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","user-select","vertical-align","visibility","white-space","widows","width","word-break","word-spacing","word-wrap","writing-mode","z-index"]



///////////////////////////////////////////////



class Node {
  constructor() {
    this.childs = new Array();
  }

  addChild(c){
    if(c) this.childs.push(c);
  }

  getChilds(){
    return this.childs;
  }

  haveChilds(){
    return this.childs.length > 0;
  }

  toCSS(){}
}

class Sequence extends Node{
  constructor() {
    super();
  }

  toCSS(){
    let arr = new Array();

    for (let c of this.childs) {
      c.toCSS(arr, new RegleCSS());
    }

    console.log(arr);

    let str = "";

    for (let regle of arr) {
      if (regle.haveAttributes()) {
        str += regle.getNom() + "{";
        for (let att of regle.getAttributes()) {
          str += att.getNom() +":"+ att.getVal() +";";
        }

        str += "}";
      }
    }

    return str;
  }
}

class Block extends Node{
  constructor() {
    super();
    this.nom = "";
    this.attributes = new Array();
  }

  setNom(n){
    this.nom = n.trim();
  }

  getNom(){
    return this.nom;
  }

  addAttribute(att){
    this.attributes.push(att);
  }

  getAttributes(){
    return this.attributes;
  }

  toCSS(arr, rcss){
    rcss.addNom(this);
    rcss.setAttributes(this.getAttributes());
    arr.push(rcss);

    for (let a of this.getChilds()) {
      a.toCSS(arr, rcss.dupliquer());
    }
  }
}


class RegleCSS {
  constructor(nom = "", attrs = null) {
    this.nom = nom;
    this.attributes = attrs;
  }

  setAttributes(attrs){
    this.attributes = attrs;
  }

  getAttributes(){
    return this.attributes;
  }

  haveAttributes(){
    return this.attributes.length > 0;
  }

  addNom(block){
    let arrParent = this.nom.split(',');
    let arrEnfant = block.getNom().split(',');

    let arr = new Array();

    for (let i = 0; i < arrParent.length; ++i) {
      for (let j = 0; j < arrEnfant.length; ++j) {
        let spe = arrEnfant[j][0]
        arr.push(arrParent[i] +((spe == ':' || spe == '[') ? "" : " ")+ arrEnfant[j]);
      }
    }

    this.nom = arr.join(',');
  }

  getNom(){
    return this.nom;
  }

  dupliquer(){
    return new RegleCSS(this.getNom(), this.getAttributes());
  }
}

class Attribut extends Node{
  constructor() {
    super();
    this.nom = "";
    this.val = "";
  }

  setNom(n){
    this.nom = n.trim();
  }

  getNom(){
    return this.nom;
  }

  setVal(v){
    this.val = v.trim();
  }

  getVal(){
    return this.val;
  }
}

class KCSSReader {
  constructor(text) {
    this.text = this.prePoc(text);

    this.length = text.length;
    this.pointer = 0;

    this.currentLine = 1;
    this.currentCol = 0;

    this.currentChar = "";

    this.vars = new Array();

    this.feuille = this.readSequence();

    console.log(this.feuille);
    console.log(this.feuille.toCSS());
  }

  prePoc(text){
    let finalText = "";

    let commentChar = null;
    let wait = false;

    for (let i = 0; i < text.length-1; ++i) {
      let c1 = text[i];
      let c2 = text[i+1];

      wait = false;

      if(!commentChar){
        if(c1 == '/' && c2 == '/') commentChar = '\n';
        else if (c1 == '/' && c2 == '*') commentChar = '*';
      } else {
        if(commentChar == '\n' && c1 == '\n') commentChar = null;
        else if (commentChar == '*' && c1 == '*' && c2 == '/'){
          commentChar = null;
          wait = true;
          ++i;
        }
      }

      if(!commentChar && !wait) finalText += c1;
    }

    return finalText;
  }

  notEOF(){
    return this.pointer < this.text.length;
  }

  readChar(offset = 0){
    let index = this.pointer + offset
    if(index >= this.text.length) return 0;
    return this.text[index];
  }

  nextChar(n = 1){
    while (n--) {
      ++this.currentCol;

      if(this.readChar() == "\n"){
        ++this.currentLine;
        this.currentCol = 0;
      }

      ++this.pointer
    }
  }

  skipSpaces(){
    let c = this.readChar();
    while (c === ' ' || c === '\n' || c === "\t"){
      this.nextChar();
      c = this.readChar();
    }
  }

  isSimpleChar(c){
    let v = c ? c.charCodeAt(0) : c;
    return (v >= 97 && v <= 122) || (v >= 65 && v <= 90) || (v >= 48 && v <= 57);
  }

  readNom(move = false){
    let buffer = "";
    let offset = 0;

    let c = this.readChar();
    while(this.isSimpleChar(c)){
      buffer += c;
      c = this.readChar(++offset);
    }

    if (move) this.nextChar(offset);

    return buffer;
  }

  exception(str){
    return `${str}
    ligne: ${this.currentLine}
    colonne: ${this.currentCol}`;
  }


//////////////////////////////////////////////////////////////


  readSequence(){
    const seq = new Sequence();

    this.skipSpaces();

    while (this.notEOF()) {

      if(!this.readVar()){
        let node = this.readBlockMedia();
        if(!node) node = this.readBlock();

        if(!node) throw this.exception("Il y a une erreur autour de:");

        seq.addChild(node);
      }

      this.skipSpaces();
    }

    return seq;
  }



  readVar(){
    if(this.readChar() != '?') return false;

    this.nextChar();
    let nomVar = this.readNom(true);

    this.skipSpaces();

    if(this.readChar() != ':') throw this.exception(`Séparateur ':' manqant`);

    this.nextChar();
    this.skipSpaces();

    let buffer = ""
    let c = this.readChar();
    while(c != ';' && c != '\n'){
      buffer += c;
      this.nextChar();
      c = this.readChar();
    }

    if(c == ';') this.nextChar();

    this.vars[nomVar] = buffer;

    this.skipSpaces();

    return true;
  }

  readVarVal(){
    let nomVar = this.readNom(true);
    let val = this.vars[nomVar];
    if(val == null || val == undefined) throw this.exception(`La variable '${nomVar}' n'existe pas`);
    return val;
  }


  readBlock(){
    const block = new Block();

    let nomFinal = "";

    do {
      let c = this.readChar();

      if (c != ':' && c != '[') {
        if(c == '.' || c == '#'){
          nomFinal += c;
          this.nextChar();
          nomFinal += this.readNom(true);
        } else if (c == '*'){
          nomFinal += c;
          this.nextChar();
        } else {
          let buff = this.readNom(true);

          if(Words.tagExist(buff)) nomFinal += buff;
          else {
            throw this.exception(`Le tag '${buff}' n'existe pas`);
          }
        }
      }


      if(this.readChar() == '['){

        nomFinal += '[';

        this.nextChar();

        let c = this.readChar();

        while(this.isSimpleChar(c) || Words.attributCharExist(c) || c == '?'){
          if(c == '?') {

            this.nextChar();
            nomFinal += this.readVarVal();
            c = this.readChar();

          } else {

            nomFinal += c;
            this.nextChar();
            c = this.readChar();

          }
        }

        if(this.readChar() != ']') throw this.exception(`Jeton imprevu -> '${this.readChar()}'`);

        nomFinal += ']';

        this.nextChar();
      }


      if(this.readChar() == ':') {

        nomFinal += ':';

        let buffer = "";
        this.nextChar();

        let c = this.readChar();

        while(this.isSimpleChar(c) || c == '-' || c == ':'){
          buffer += c;

          this.nextChar();
          c = this.readChar();
        }

        let type = Words.pseudoElementsExist(buffer);

        if (type == 1) {
          nomFinal += buffer;
        } else if (type == 2) {
          nomFinal += buffer;

          if(this.readChar() != '(') throw this.exception(`Jeton imprevu -> '${this.readChar()}'`);

          nomFinal += '(';

          this.nextChar();

          let c = this.readChar();

          while (this.isSimpleChar(c) || Words.paramCharExist(c) || c == '?') {
            if(c == '?') {

            this.nextChar();
            nomFinal += this.readVarVal();
            c = this.readChar();

            } else {
              nomFinal += c;
              this.nextChar();
              c = this.readChar();
            }
          }

          if(this.readChar() != ')') throw this.exception(`Jeton imprevu -> '${this.readChar()}'`);

          nomFinal += ')';

          this.nextChar();

        } else {
          throw this.exception(`Le selecteur '${buffer}' n'existe pas`);
        }
      }


      let sep = this.readChar();
      if (Words.isSeparator(sep)) {
        this.nextChar();
        this.skipSpaces();
        if (Words.isSeparator(this.readChar())){
          nomFinal += this.readChar();
          this.nextChar();
          this.skipSpaces();
        } else {
          nomFinal += sep;
        }
      } else {
        if(this.readChar() != '{') return null;
      }

    } while (this.readChar() != '{');

    block.setNom(nomFinal);

    this.nextChar();

    this.skipSpaces();

    while (this.readChar() != '}') {

      if(!this.readVar()){
        let node = this.readAttribut();
        if (node) block.addAttribute(node);
        else{
          node = this.readBlock();
          if (node) block.addChild(node);
        }

        if (!node) {
          this.skipSpaces();
          if (this.readChar() != '}') {
            throw this.exception(`Fermeture du block '${block.nom}' introuvable`);
          }
        }
      }

      this.skipSpaces();
    }

    this.nextChar();

    return block;
  }


  readAttribut(){
    const att = new Attribut();

    let buff = this.readNom();
    let c = this.readChar();
    if((!this.isSimpleChar(c) && c != '@') || Words.tagExist(buff)) return null;

    let buffer = "";
    let offset = 0;

    c = this.readChar();
    while(this.isSimpleChar(c) || c == '-' || c == '@'){
      buffer += c;
      c = this.readChar(++offset);
    }

    if (!Words.propertieExist(buffer)) throw this.exception(`La propriété '${buffer}' n'existe pas`);

    att.setNom(buffer);

    this.nextChar(offset);
    this.skipSpaces();
    if (this.readChar() != ':') throw this.exception(`Séparateur ':' manqant`);
    this.nextChar();
    this.skipSpaces();

    if(this.readChar() == '?'){
      this.nextChar();
      att.setVal(this.readVarVal());

      while (this.readChar() === ' ') this.nextChar();
      let c = this.readChar();
      if(c == ';' || c == '\n' || c == '}') this.nextChar();
      else throw this.exception(`Jeton imprevu -> '${this.readChar()}'`);

    } else {
      let buffer = "";
      let c = this.readChar();
      while (c != ';' && c != '\n' && c != '}') {
        buffer += c;
        this.nextChar();
        c = this.readChar();
      }

      if (c == ';') this.nextChar();

      att.setVal(buffer);
    }

    return att;
  }


  readBlockMedia(){
    if(this.readChar() != '@') return null;

    throw "non pris en charge";
  }
}
