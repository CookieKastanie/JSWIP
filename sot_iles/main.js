const divIles = document.getElementById('iles');
const input = document.getElementById('in');
const output = document.getElementById('out');

const url = `https://ddc5e4l4zgom9.cloudfront.net/images/info/islands/small/`;

const iles = new Array();

for(let oldIle of islands) {
    const ile = {
        position: {
            x: oldIle.position[0],
            y: oldIle.position[1]
        },
        titlePosition: {
            x: oldIle.title_position[0],
            y: oldIle.title_position[1]
        },
        name: oldIle.fr.info.island.value,
        location: oldIle.fr.info.location.value,
        image: oldIle.fr.info.image
    };

    iles.push(ile);
}

const dico = new Autocomp(iles);

input.onkeyup = () => {
    const res = dico.verify(input.value);

    output.innerHTML = "";

    for(const ile of res) {
        const a = document.createElement('a');
        a.href="#"+ ile.location;
        a.className = "dropdown-item";
        a.innerHTML = ile.name;
        a.onclick = () => {
            input.value = ile.name;
        }
        output.appendChild(a);
    }
}

for(const ile of iles) {
    const article = document.createElement('article');
    article.id = ile.location;

    const p = document.createElement('p');
    p.innerHTML = ile.name + " / " + ile.location;
    article.appendChild(p);

    const img = document.createElement('img');
    img.src = url + ile.image;
    article.appendChild(img);

    divIles.appendChild(article);
}
