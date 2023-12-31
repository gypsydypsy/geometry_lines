/*  
************ Ambient Light
*/

/*  
    A uniform light that comes from everywhere
    Used to simulate light bounding
    NB: without ambient light, the backsides of the objects would be completely dark
*/

const ambientLight = new THREE.AmbientLight('white', 0.5);

/*  
************ Directional Light
*/

/*  
    Sun like lights
    Emits parraleles rays, and always goes towards the center of the scene
    By default, it comes from the top of the scene (but position can be changed)
    The distance doesn't affect the intensity of the light, but it does affect the shadows' apperances
*/

const directionalLight = new THREE.DirectionalLight(0x00FFFF, 0.3)

/*  
************ Hemisphere Light
*/

/*  
    Works like Ambient light but has 2 color: ground & sky
    NB : cannot be used to cast shadows
*/

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)

/*  
************ Point Light
*/

/*  
    Light buld effect
    A small light points with rays that goes towards every directions

    Special params: 
        distance : max distance at which the rays stops
        decay: fade intensity
*/

const pointLight = new THREE.PointLight(0xff9000, 0.4, 10, 2)

/*  
************ ReactArea Light
*/

/*  
    /!\ Only works with physically correct materials (StandardMaterial, PhysicalMaterial)
    Mimics a photoshoot rectangular light, light comes from an illuminated rectangle

    Special params: 
        - width
        - height
*/

const reactAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)

/*  
************ Spot Light
*/

/*  
    Simulates a flashlight
    The rays goes towards one specific direction and hits surfaces forming a circle shape

    Special params: 
        - Distance
        - Angle : defines how wide is the light => use PI
        - Penumbra : defines the blur on the edge of the circle
        - Decay : intensity of the fade
*/

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)

/* Orientate the spot light */

// Methods like rotation or lookAt() won't work, you must define a target

spotLight.target.position.set(0, 1, 2)
scene.add(spotLight.target) // DON'T FORGET TO ADD THE TARGET TO THE SCENE AS WELL

/*  
************ Methods & properties
*/

/* NB : may not work on all types of light */

light.lookAt(/* 3D object or THREE.Vector3 */)
light.dispose()

light.castShadow = true

/*  
************ Performance TIPS
*/

/*  
    => Add as few lights as possible (limitation is 50, but 50 is already way too much)

    // Minimal cost => AmbientLight, HemisphereLight
    // Moderate cost => DirectionalLight, PointLight
    // Hight cost => SpotLight, RectAreaLight
*/