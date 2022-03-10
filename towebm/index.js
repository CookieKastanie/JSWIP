#!/usr/bin/env node
const { spawn } = require('child_process');

const args = process.argv.slice(2);

if(args.length < 1) {
    console.warn('Missing 1 argument : path/url');
} else {
    const input = args[0];

    const filename = input.replace(/^.*[\\\/]/, '');
    let pos = filename.lastIndexOf(".");
    const output = filename.substring(0, pos < 0 ? filename.length : pos) + '.webm';
    
    // ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm
    const ffmpeg = spawn('ffmpeg',
        ['-i', input, '-c:v', 'libvpx-vp9', '-crf', '30',
        '-b:v', '0', '-b:a', '128k', '-c:a', 'libopus', output
    ]);
    
    ffmpeg.stdout.pipe(process.stdout);
    ffmpeg.stderr.pipe(process.stderr);
    process.stdin.pipe(ffmpeg.stdin);

    ffmpeg.on('exit', () => process.exit());
}
