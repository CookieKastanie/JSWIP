export const frags = new Array();

import tex from './frag_texture';
frags.push(...tex);

import hsv from './frag_hsv';
frags.push(...hsv);

import simplex from './frag_simplexNoise';
frags.push(...simplex);

import voronoise from './frag_voronoise';
frags.push(...voronoise);

