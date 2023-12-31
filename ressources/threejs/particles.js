/** 
 * Each particle is composed of a plane (2 triangles) always facing the camera
 * 
 * To create a particle, you need: 
 *      - BufferGeometry
 *      - PointsMeterial
 *      - A Points instance (instead of a Mesh)
 * 
*/

/*  
********** Custom Buffer Geometry
*/

const particlesGeometry = new THREE.BufferGeometry()

const count = 5000;

let positions = new Float32Array(count * 3)
let colors = new Float32Array(count * 3)

for (let i = 0; i < count; i++ ){
    let i3 = i * 3;

    positions[i3 + 0] = Math.random() // X
    positions[i3 + 1] = Math.random() // Y
    positions[i3 + 2] = Math.random() // Z

    colors[i3 + 0] = Math.random() // R
    colors[i3 + 1] = Math.random() // V
    colors[i3 + 2] = Math.random() // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

/*  
********** Points Material
*/

const particlesMaterial = new THREE.PointsMaterial({

    /* alphaMap */
    alphaMap: particleTexture,

    /* color */
    color: new THREE.Color('white'),

    /* Fog */
    fog: true, // default true

    /* Map */
    map: colorTexture, 

    /* Size */
    size: 0.1, // Default 1
    sizeAttenuation: true, // Creates perspective, if set to true, particles far from the camera will look smaller
   
    /* Fix perspective/transparency bugs by tweeking the following parameters : */
    alphaTest: 0.01,
    depthWrite: false,
    blending: THREE.AdditiveBlending,

    /* Enable vertex color if you wan't to use the color attributes passed in the geometry */
    vertexColors: true,
})

// How to fix transparency problems : 

// 1. set the alphatest
particlesMaterial.alphaTest = 0.01 // By doing that, the particles with an opacity of 0 won't be rendered

// 2. Desactivate depthWrite
particlesMaterial.depthWrite = false // Particles are not dranw in the depth buffer anymore

// 3. Change the blending
particlesMaterial.blending = THREE.AdditiveBlending;
// NB: possible value : THREE.NoBlending | THREE.NormalBlending | THREE.AdditiveBlending | THREE.SubstractiveBlending | THREE.MultiplyBlending

/*  
********** Points
*/

const points = new THREE.Points(particlesGeometry, particlesMaterial)

/*  
********** Performances tips
*/

// You can change the particles position by accessing the position attribute in the geometry

for (let i = 0; i < count; i++){
    const i3 = i * 3;

    const x = particlesGeometry.attributes.positioni.array[i3 + 0];

    particlesGeometry.attributes.positions.array[i3 + 1] = Math.sin(x) // Y becomes sin(x)
}

/* /!\ BUT NEVER DO IT THAT'S TOO MUCH FOR THE GPU */
// => Use custom shaders instead