const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { URL } = require('url');
const ytdl = require('ytdl-core');

const isYTURL = url => {
    return url.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/);
}

const toSafeName = name => {
    return name.replace(/[^a-z0-9]/gi, '_');
}

const parsePath = p => {
    let file;

    if(p.startsWith('http')) {
        const url = new URL(p);
        file = path.parse(url.pathname);
    } else{
        file = path.parse(p);
    }

    return {
        path: p,
        name: file.name,
        ext: file.ext,
    }
}

module.exports = {
    exec: function(input, output) {
        return new Promise((resolve, reject) => {
            ffmpeg({source: input})
            .saveToFile(output)
            .on('error', reject)
            .on('end', resolve);
        });
    },

    webm: function(p) {
        if(isYTURL(p)) {
            return ytdl.getBasicInfo(p).then(infos => {
                return this.exec(ytdl(p), `./${toSafeName(infos.videoDetails.title)}.webm`);
            });
        } else {
            const file = parsePath(p);
            return this.exec(file.path, `./${toSafeName(file.name)}.webm`);
        }
    }
}
