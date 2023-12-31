/*  
*   Steps

    1/ Create a physics world
    2/ Duplicate each THREE.JS Mesh to a CANNON.JS Body
    3/ Aply forces
    3/ Update Meshes positions according the Bodies position
*/

/*  
************************ Create Physics World
*/

import CANNON from 'cannon'

const world = new CANNON.World()
world.gravity.set(0, -9.82, 0) // Earth-like settings


/*  
*********************** Materials
*/

/*  /!\  CANNON Materials don't have the same meaning as three materials
    They are used to describe the surface of bodies (hard, soft, bouncing...)
    And define the interaction of bodies when colliding
*/

// Custom contact Materials
const concreteMaterial = new CANNON.Material('concrete') // Names are just for reference
const plasticMaterial = new CANNON.Material('plastic')

const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial, 
    plasticMaterial,
    {
        friction: 0.1,      // The less friction the more sliding
        restitution: 0.7    // Bouncing
    }
)

world.addContactMaterial(concretePlasticContactMaterial)

// Default contact material
/* To keep things simple, you can set a default material for all bodies */

const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)

world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial


/*  
********************** Create a body
*/

// ----- Matching THREE.JS Object

const geometry = new THREE.SphereGeometry(0.5, 10, 10);
const material = new THREE.MeshBasicMaterial({color: 'red'});
const mesh = new THREE.Mesh(geometry, material);

// ----- Create a shape

const shape = new CANNON.Sphere(0.5) // The radius is the same as in the THREE geometry

// ----- Create a body 
const body = new CANNON.Body({
    mass: 1, 
    position: new CANNON.Vec3(0, 0, 0), // Put the same starting position
    shape: shape, 
    material: plasticMaterial           // Set custom material if there's no default 
})

/*  
********************** Rotating bodies
*/

// Cannon JS only supports quaternions
body.quaternion.setFromAxisAngle(
    new CANNON.Vec3(1, 0, 0),   // Axis of rotation, here x
    - Math.PI * 0.5             // Angle of rotation in radians
)

/*  
********************** Apply forces
*/

// This force could be used to simulate wind for instance
body.applyForce(
    new CANNON.Vec3(-0.5, 0, 0),    // Vector : strength and direction of the force
    body.position                   // Point in the world where the force is applied
)

// NB : Put this code in the render
//      USe applyLocalForce to use local coordinates


/*  
*********************** Update positions 
*/

const clock = new THREE.Clock()
const previousTime = 0

const render = () => {
    /* [...] */

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previousTime;
    const previousTime = elapsedTime;

    // 1. Set the world's update steps

    world.step(
        1/60,           // Fixed time step, use 1/60 for 60 fps
        deltaTime,      // timeSinceLastCall
        3               // MaxSubStep : max numbers of iterations to catch up with potential delay
    )

    // 2. Update positions

    mesh.position.copy(body.position)
}

/*  
********************** Events
*/

body.addEventListener('collide', (collision) => {

    // The param collision is automatically passed in the callback function
    console.log(collision)

    // You can get tones of info about the collision
    const impactStrength = collision.contact.getImpactVelociyAlongNormal()
})

/*  
*********************** Optimizations
*/

// Broadphase : how Cannon.js checks if object are colliding or not

world.broadphase = new CANNON.NaiveBroadphase(world)    // Default, test every objects
world.broadphase = new CANNON.GridBroadphase(world)     // Divides the scene into a grid and test neighbor cells only
world.broadphase = new CANNON.SAPBroadphase(world)      // Arbitrary tests, usually the best for performances

// Sleep : allow object to enter sleep mode when not moving

world.allowSleep = true // False by default

// NB : for even more optimization, use sleepSpeedLimit, sleepTimeLimit