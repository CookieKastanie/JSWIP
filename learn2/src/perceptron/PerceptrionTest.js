const { Perceptron } = require("./Perceptron");

export class PerceptronTest {
    constructor() {
        const p = new Perceptron(3, 0.01);

        const dx = new Array(1000);
        const dy = new Array(dx.length);
        
        const f = (() => {
            const m = (Math.random() * 2 - 1);
            const b = (Math.random() * 2 - 1);

            return x => {
                return x * m + b;
            }
        })();
        
        for(let i = 0; i < dx.length; ++i) {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
        
            dx[i] = [x, y, 1];
            dy[i] = f(x) > y ? 1 : -1;
        }

        
        /*for(let i = 0; i < dx.length; ++i) {
            p.train(dx[i], dy[i]);
        }


        
        let count = 0;
        for(let i = 0; i < dx.length; ++i) {
            count += p.forward(dx[i]) == dy[i] ? 1 : 0;
        }

        console.log(`Score: ${count / dx.length}`);*/
        
        


        const c = document.querySelector('canvas');
        const ctx = c.getContext('2d');

        c.width = 600;
        c.height = 600;

        

        ctx.translate(c.width / 2, c.height / 2);


        let i = 0;


        const draw = () => {
            if(i < dx.length) {
                for(let z = 0; z < 20; ++z) {
                    p.train(dx[i], dy[i]);
                    ++i;
                }
                

                if(i == dx.length) {
                    let count = 0;
                    for(let i = 0; i < dx.length; ++i) {
                        count += p.forward(dx[i]) == dy[i] ? 1 : 0;
                    }

                    if(count / dx.length < 0.99) {
                        i = 0;
                    }

                    console.log(`Score: ${count / dx.length}`);
                }
            }

            ctx.fillStyle = '#000';
            ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);

            for(let i = 0; i < dx.length; ++i) {
                if(dy[i] == 1) ctx.fillStyle = '#0F0';
                else ctx.fillStyle = '#F00';
                ctx.fillRect(dx[i][0] * (c.width / 2), dx[i][1] * (c.height / 2), 1, 1);
            }
    
            
            ctx.strokeStyle = '#FFF';
            const weights = p.getWeights();
            const x1 = -1;
            const y1 = (-weights[2] - weights[0] * x1) / weights[1];
            const x2 = 1;
            const y2 = (-weights[2] - weights[0] * x2) / weights[1];


            ctx.beginPath();
            ctx.moveTo(x1 * (c.width / 2), y1 * (c.height / 2));
            ctx.lineTo(x2 * (c.width / 2), y2 * (c.height / 2));
            ctx.stroke();


            requestAnimationFrame(draw);
        }

        draw();
    }
}

