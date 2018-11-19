const body = document.getElementsByTagName('body')[0];

const style = document.getElementsByTagName('style')[0];

style.innerHTML = `
div{
  display: inline-block;
  font-size : 0;
  width: ${innerWidth/10}px;
  height: ${innerHeight/10}px;
  background-color: #125;
}
`;

let tuiles = new Array();
for (let y = 0; y < innerWidth/100; ++y) {
  for (let x = 0; x < innerHeight/100; ++x) {
    const t = document.createElement('div');
    body.append(t);
  }
}
