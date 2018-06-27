class DOMNode {
  constructor(name = "") {
    this.DOMName = name.trim();
    this.DOMNodeChilds = new Array();
  }

  set innerHTML(text){
    this._innerHTML = text;
    this.DOMNodeChilds = new Array();
  }

  get innerHTML(){
    return this._innerHTML;
  }

  appendChild(child){
    this._innerHTML = undefined;
    this.DOMNodeChilds.push(child);
  }

  removeChild(child){
    const index = this.DOMNodeChilds.indexOf(child);
    if (index > -1) this.DOMNodeChilds.splice(index, 1);
  }

  toString(n = 0){
    const tab = "\t".repeat(n);

    let str = `\n${tab}<${this.DOMName}`;

    for(let att in this) {
      if (att != 'DOMName' && att != 'DOMNodeChilds' && att != '_innerHTML') {
        str += ` ${att}="${this[att]}"`;
      }
    }

    str += `>`;

    if (this._innerHTML) str += `\n\t${tab}${this._innerHTML}`;

    for(let child of this.DOMNodeChilds){
      if(typeof child != "string") str += `${child.toString(n + 1)}`;
      else str += `\n\t${tab}${child}`;
    }

    str += `\n${tab}</${this.DOMName}>`;

    return str;
  }
}

class DocumentMaker extends DOMNode{
  constructor(opts = {}){
    super();
    this.doctype = opts.doctype || "html";
    for (let e of (opts.base || ["head", "body"])) {
      const node = this.createElement(e);
      this[e] = node;
      this.appendChild(node);
    }
  }

  set doctype(doc){
    this._doctype = doc.trim();
  }

  get doctype(){
    return this._doctype;
  }

  createElement(name){
    return new DOMNode(name);
  }

  toString(){
    let str = this._doctype != 'none' ? `<!DOCTYPE ${this._doctype}>` : '';
    for(let child of this.DOMNodeChilds) str += child.toString();
    return str;
  }
}
