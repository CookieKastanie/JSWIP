/*const body = document.getElementsByTagName('body')[0];

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
}*/


/*
const content = document.getElementById('content');

const pages = document.getElementsByClassName('page');

const offsetHeight = document.getElementsByTagName('ul')[0].offsetHeight;

const menu = new Array().slice.call(document.getElementsByTagName('li'));

for (let i in menu) {
  const btn = menu[i];

  btn.onclick = () => {
    const p = pages[i];
    console.log(p.offsetTop - offsetHeight);
    window.scrollTo(0, p.offsetTop - offsetHeight);
  }
}
*/
