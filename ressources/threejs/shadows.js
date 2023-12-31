/*  
    Theory
    Drop shadows : projected shadows
    Core shadows : shadows on the object

    Three.js creates one shadow map for each light that can cast shadows

    How to activate it ?
        1. Activate shadowMap on the renderer;
        2. Activate castShadow / receiveShadow on concerned meshes
        3. Activate castShadow on concerned lights

*/

/*  
***********   Activate shadows on lights
*/

light.castShadow = true

// Optimization 1 : set the shadowmap size to the perfect match
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024; // /!\ Must be a power of 2

// Optimization 2 : improve the shadow map's camera settings
// NB : TIP => Use a camera helper to vizualise the shadow map's camera

light.shadow.camera.near = 1;
light.shadow.camera.far = 6;

/* /!\ Depending on the light, the shadow's camera can be perspective or orthographie,
       if orthographic, you can tweek the dimensions
*/

light.shadow.camera.top = 2;
light.shadow.camera.bottom = -2;
light.shadow.camera.left = -2;
light.shadow.camera.right = 2;

//Optimization 3 : change the shadow's radius

light.shadow.radius = 10


/*  
***********   Activate shadows on meshes
*/

mesh.receiveShadow = true
mesh.castShadow = true // NB Meshes can cast AND receive shadows


/*  
***********  Activate shadows on the renderer :  Shadow Maps
*/

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap  // Very performant but low quality
renderer.shadowMap.type = THREE.PCFShadowMap    // Default, less performant but smoother edges
renderer.shadowMap.type = THREE.PCFSoftShadowMap      // Less performant, but best quality
renderer.shadowMap.type = THREE.VSMShadowMap    //  Don't use it, unexpected results and bugs


/*  
***********   Optimization : tweak shadow bias
*/

// Bias : How much to offset the normalized depth when deciding of the surface is in shadow or not
// Works better on flat surfaces
light.shadow.bias = 0.00001 // /!\ Very tiny adjustments only ! 

// Normal Bias : works better on rounded surfaces, helps reducing shadow acne
light.shadow.normalBias = 0.05