precision mediump float;

attribute vec3 aPos;
attribute vec3 aColor;
attribute vec3 aNormal;


varying vec3 v_FragPos;
varying vec3 v_Normal;
varying vec3 v_Color;

varying vec3 v_toLightVector;
varying vec3 v_toCameraVector;


uniform mat4 viewMatrix;
uniform mat4 projectionView;
uniform mat4 model;

uniform vec3 lightPos;


/*
mat3 transpose(in mat3 yuv_matrix) {
    return mat3(
    vec3(yuv_matrix[0].x, yuv_matrix[1].x, yuv_matrix[2].x),
    vec3(yuv_matrix[0].y, yuv_matrix[1].y, yuv_matrix[2].y),
    vec3(yuv_matrix[0].z, yuv_matrix[1].z, yuv_matrix[2].z));
}

mat3 inverse(in mat3 m) {
  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];
  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];
  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];

  float b01 = a22 * a11 - a12 * a21;
  float b11 = -a22 * a10 + a12 * a20;
  float b21 = a21 * a10 - a11 * a20;

  float det = a00 * b01 + a01 * b11 + a02 * b21;

  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),
              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),
              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;
}*/


mat4 inverse(in mat4 m) {
  float
      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}




/*
void main()
{    
    vec4 worldPosition = model * vec4(aPos, 1.0);

    //v_FragPos = vec3(model * vec4(aPos, 1.0));
    v_FragPos = worldPosition.xyz;

    //v_Normal = transpose(inverse(mat3(model))) * aNormal;
    //v_Normal = inverse(mat3(model)) * aNormal;

    v_Normal = mat3(model) * aNormal;
    v_Color = aColor;

    //gl_Position = projectionView * model * vec4(aPos, 1.0);
    gl_Position = projectionView * worldPosition;
}
*/

void main()
{    
    vec4 worldPosition = model * vec4(aPos, 1.0);
    gl_Position = projectionView * worldPosition;
    v_Color = aColor;

    v_FragPos = gl_Position.xyz;

    v_Normal = mat3(model) * aNormal;
    v_toLightVector = lightPos - worldPosition.xyz;
    v_toCameraVector = (inverse(viewMatrix) * vec4(0.0, 0.0, 0.0, 1.0)).xyz - worldPosition.xyz;
}
