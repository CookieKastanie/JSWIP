precision mediump float;

varying vec2 uv;
/*
const float exposure = 0.6;
const float decay = 0.9;
const float density = 4.0;
const float weight = 0.3;
uniform vec2 lightPositionOnScreen;
*/


const float exposure = 0.5;
const float decay = 0.93;
const float density = 5.0;
const float weight = 0.5;
uniform vec2 lightPositionOnScreen;


uniform sampler2D firstPass;
const int NUM_SAMPLES = 300;

void main()
{	
    vec2 deltaTextCoord = vec2( uv - lightPositionOnScreen.xy );
    vec2 textCoo = uv;
    deltaTextCoord *= 1.0 /  float(NUM_SAMPLES) * density;
    float illuminationDecay = 1.0;


    for(int i=0; i < NUM_SAMPLES ; i++) {
                textCoo -= deltaTextCoord;
                vec4 sample = texture2D(firstPass, textCoo );
        
                sample *= illuminationDecay * weight;

                gl_FragColor += sample;

                illuminationDecay *= decay;
        }
    gl_FragColor *= exposure;
}
