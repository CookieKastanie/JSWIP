console.log('hue')

const W = 50, H = 30;
const size = 15;

const canvas = document.querySelector('canvas');
canvas.width = W * size; canvas.height = H * size;
const ctx = canvas.getContext('2d');






const draw = (mat) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W * size, H * size);

    for(let y = 0; y < H; ++y) {
        for(let x = 0; x < W; ++x) {
            const val = mat[y][x];

            if(val) {
                switch(val) {
                    case 1: ctx.fillStyle = "#0F0"; break;
                    case 2: ctx.fillStyle = "#00F"; break;
                    case 3: ctx.fillStyle = "#0FF"; break;
                    case 4: ctx.fillStyle = "#FF0"; break;

                    case 1001: ctx.fillStyle = "#F00"; break;
                }

                ctx.fillRect(x * size, y * size, size, size);
            }
        }
    }
}



///////////////

let socket;

const connect = (ip = 'localhost') => {
    //let ip = 'localhost';
    const ipsave = ip;
    if(ip == ""){
        ip = "localhost";
    }

    socket = io.connect("http://"+ ip +":3000");

    socket.on('connect', () => {
        /*this.setSocketEvents();
        this.go();*/
    });

    socket.on('connect_error', () => {
        console.warn("Connexion impossible à l'adresse: "+ ipsave +" :(");
        //location.reload();
    });

    socket.on('frame', draw);


    document.onkeydown = (e) => {
        switch (e.keyCode) {
            case 38: socket.emit('move', 'up'); break;
            case 40: socket.emit('move', 'down'); break;
            case 37: socket.emit('move', 'left'); break;
            case 39: socket.emit('move', 'right'); break;
        }
    }
}

const start = () => {
    socket.emit('start', null);
}
