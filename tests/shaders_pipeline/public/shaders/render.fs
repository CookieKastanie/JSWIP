precision mediump float;


varying vec3 v_FragPos;
varying vec3 v_Normal;
varying vec3 v_Color;

varying vec3 v_toLightVector;
varying vec3 v_toCameraVector;

uniform vec3 lightPos;
uniform vec3 viewPos;

const float shineDamper = 10.0;
const float reflectibity = 1.0;
uniform vec3 lightColor;




const float W = 300.0;
const float H = 300.0;


void main() {
    vec3 unitNormal = normalize(v_Normal);
    vec3 unitLightVector = normalize(v_toLightVector);

    float nDot1 = dot(unitNormal, unitLightVector);
    float brightness = max(nDot1, 0.0);
    vec3 diffuse = brightness * lightColor;

    vec3 unitVectorToCamera = normalize(v_toCameraVector);
    vec3 lightDirection = -unitLightVector;
    vec3 reflecttedLightDirection = reflect(lightDirection, unitNormal);

    float specularFactor = dot(reflecttedLightDirection, unitVectorToCamera);
    specularFactor = max(specularFactor, 0.0);
    float dampedFactor = pow(specularFactor, shineDamper);
    vec3 finalSpecular = dampedFactor * reflectibity * lightColor;

    //gl_FragColor = vec4(diffuse, 1.0) * vec4(v_Color, 1.0) + vec4(finalSpecular, 1.0);

    gl_FragColor = vec4(diffuse * v_Color + finalSpecular, log(v_FragPos.z + 2.0));


    //gl_FragColor = vec4(v_FragPos, 1.0);


    //gl_FragColor = vec4(0.0, 0.0, v_FragPos.z, 1.0);
}

/*
void main()
{           
    vec3 color = v_Color;
    vec3 normal = normalize(v_Normal);
    vec3 lightColor = vec3(1.0);
    // ambient
    vec3 ambient = 0.15 * color;
    // diffuse
    vec3 lightDir = normalize(lightPos - v_FragPos);
    float diff = max(dot(lightDir, normal), 0.0);
    vec3 diffuse = diff * lightColor;
    // specular
    vec3 viewDir = normalize(viewPos - v_FragPos);
    float spec = 0.0;
    vec3 halfwayDir = normalize(lightDir + viewDir);
    spec = pow(max(dot(normal, halfwayDir), 0.0), 64.0);
    vec3 specular = spec * lightColor;    
  
    vec3 lighting = (ambient + 1.0 * (diffuse + specular)) * color;    
    
    gl_FragColor = vec4(lighting, 1.0);
}
*/
/*
void main()
{           
    gl_FragColor = vec4(v_Color, 1.0);
}
*/
