const fs = require('fs');
const request = require('request');

const http = require('https');


/*
module.exports = (url, dest) => {
    return new Promise((resolve) => {
        request(url)
        //.pipe(fs.createWriteStream(__dirname + '/' + dest 'bootstrap.zip'))
        .pipe(fs.createWriteStream('bootstrap.zip'))
        .on('close', function () {
            console.log('File written!');
            resolve();
        });
    })
}
*/

/*
module.exports = (url, dest) => {
    return new Promise((resolve) => {
        request({url, encoding: "binary"}, function(err, resp, body) {
            //if(err) throw err;
            fs.writeFile(dest, body, function(err) {
              console.log("file written!");
            });
          });
    })
}
*/



module.exports = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const sendReq = request.get(url);

        sendReq.on('response', (response) => {
            if (response.statusCode !== 200) {
                reject('Response status was ' + response.statusCode);
                return;
            }

            sendReq.pipe(file);
        });

        file.on('finish', () => {
            //file.close(cb);
            file.close();
            console.log("u")
            resolve();
        });

        sendReq.on('error', (err) => {});

        /*sendReq.on('error', (err) => {
            fs.unlink(dest, () => {});
            console.log("a");
            reject(err.message);
            return;
        });

        file.on('error', (err) => {
            fs.unlink(dest, () => {});
            console.log("b");
            reject(err.message);
            return;
        });*/
    });
};


/*module.exports = */(url, dest) => {
    const file = fs.createWriteStream(dest, "binary");

    return new Promise((resolve, reject) => {

        let responseSent = true;

        http.get(url, response => {

            response.pipe(file);

            file.on('finish', () => {

                file.close(() => {

                    if (responseSent) return;
                    responseSent = true;
                    resolve();
                });
            });

            /*var data = [];

            response.on('data', function(chunk) {
                console.log('chunk', chunk)
                data.push(chunk);
            }).on('end', function() {
                console.log('uuuuuuuuuuu')
                //at this point data is an array of Buffers
                //so Buffer.concat() can make us a new Buffer
                //of all of them together
                var buffer = Buffer.concat(data);
                console.log('ttttttttttttttttttttt', buffer);
                //console.log(buffer.toString('base64'));

                responseSent = true;
            });*/

            //resolve();

        }).on('error', err => {

            /*if (responseSent) return;
            responseSent = true;
            console.log("PD")
            reject(err);*/
        });
    });
}
