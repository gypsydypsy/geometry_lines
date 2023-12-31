
/*  
******* Init the renderer
*/

const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,     // Links to the dom element
        antialias : true,   // Prevents stair-like effects 
        alpha: true         // To make the clear color transparent
    }
)

/*  
******* Set up size and pixel ratio
*/

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // No need to go higher than 2

//Update dynamically
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/*  
******* Aesthetics 
*/

// Set Clear Color
renderer.setClearColor(0x262837)

// Physically correct lights
renderer.physicallyCorrectLights = true;

/*  
******** Tone Mapping
*/

// Tone mapping defines how the colors are translated to the screen

renderer.toneMapping = THREE.NoToneMapping // default
renderer.toneMapping = THREE.LinearToneMapping
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMapping = THREE.ACESFilmicToneMapping

renderer.toneMappingExposure = 2 // Defines how mush the colors are affected by the tone mapping

/*  
******** Enable shadows
*/

// See shadows.js
renderer.shadowMap.enable = true;
renderer.shadowMap.type = new THREE.PCFSoftShadowMap


/*  
******** Output encoding
*/

renderer.outputEncoding = THREE.LinearEncoding  // default one, "robotic" not very realistic
renderer.outputEncoding = THREE.sRGBEncoding    // closest to how our eyes actually perceive light

/*  
******* Render function
*/

const render = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(render)
}