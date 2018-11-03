precision mediump float;

uniform sampler2D diffuse;
uniform sampler2D texNormal;

uniform vec3 lightColour;
uniform float texTile;

varying vec2 uv;
varying vec3 toCameraVector;
varying vec3 fromLightVector;

const float shineDamper = 20.0;
const float reflectivity = 0.6;

void main(){
  vec3 viewVector = normalize(toCameraVector);

  //vec3 normal = normalize((texture2D(texNormal, uv) * 2.0 - 1.0).xyz);
  vec4 t = texture2D(texNormal, uv * texTile);
  vec3 normal = vec3(t.r * 2.0 - 1.0, t.g * 2.0 - 1.0, t.b * 2.0 - 1.0);
  normal = normalize(normal);

  vec3 reflectedLight = reflect(normalize(fromLightVector), normal);
  float specular = max(dot(reflectedLight, viewVector), 0.0);
  specular = pow(specular, shineDamper);
  vec3 specularHightlights = lightColour * specular * reflectivity;

  gl_FragColor = texture2D(diffuse, uv * texTile) + vec4(specularHightlights, 0.0);
  //gl_FragColor = texture2D(diffuse, uv);
}
