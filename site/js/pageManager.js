const initPageManager = (changePageEvent = e => {}) => {
  const pages = document.getElementsByClassName('page');

  const NBPAGE = pages.length;

  const content = document.getElementById('content');
  content.style.gridTemplateColumns = (() => {
    const pourcent = 100 / NBPAGE;
    let str = "";
    for (var i = 0; i < NBPAGE; ++i) {
      str += pourcent + "% ";
    }

    return str;
  })();

  let totalWidth = 0;

  let currentPage = 0;

  const scroll = () => {
    content.style.transform = 'translateX('+ (-innerWidth * currentPage) +'px)';
  }

  const resizeEvent = () => {
    totalWidth = innerWidth * NBPAGE;
    content.style.width = totalWidth +"px";
    scroll();
  };

  window.addEventListener("resize", resizeEvent);
  resizeEvent();

  ////////////////////////////////////////////////////////////

  const menu = new Array().slice.call(document.getElementsByTagName('li'));

  const selectedBtn = () => {
    menu.forEach(m => m.classList.remove('selected'));
    menu[currentPage].classList.add('selected');

    changePageEvent(currentPage);
  }

  for (let i in menu) {
    const btn = menu[i];

    btn.onclick = () => {
      currentPage = i;
      selectedBtn();
      scroll();
    }
  }

  selectedBtn();
};
