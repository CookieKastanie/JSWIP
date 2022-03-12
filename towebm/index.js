#!/usr/bin/env node
const videoDL = require('./videoDL');

const args = process.argv.slice(2);

if(args.length < 1) {
    console.warn('Missing 1 argument : path/url');
} else {
    
    videoDL.webm(args[0]).then(() => {
        console.log('Done.');
    }).catch(console.error);
}
