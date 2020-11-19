export default {
    fileOptions: 'Fichier',
    import: 'Importer',
    export: 'Exporter',
    textureLabel: 'Textures',
    bufferSelectorLabel: 'Buffer actuel :',
    size: 'Taille :',
    width: 'Largeur :',
    height: 'Hauteur :',
    apply: 'Appliquer',
    noError: 'Aucune erreur.',
    help: 'Aide',
    helpText:
`Liste des variables/constantes :

    TextureInfo currentBuffer
    TextureInfo buffer[A..D]
    TextureInfo tex[A..F]

    float time

    float PI
    float HALF_PI


Liste des fonctions additionnelles :

    vec4 texture(TextureInfo, vec2)

    vec3 rgb2hsv(vec3)
    vec3 hsv2rgb(vec3)

    mat2 rotate(float)
    mat3 rotateX(float)
    mat3 rotateY(float)
    mat3 rotateZ(float)

    float snoise(vec[2,3,4])
    float voronoi(vec2, float, float)
    vec3 voronoiDist(vec2, float)
`
}
