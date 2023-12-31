import GUI from 'lil-gui'

const gui = new GUI()

/*
****** Simple Params
*/


// Range 
gui.add(mesh.position, 'x').min(-2).max(2).step(0.01).name('meshPositionX')

// Boolean 
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// Colors
gui.addColor(material, 'color')

/*  
******** Debug Object
*/

const debugObject = {
    spin: () => {
        gsap.to(mesh.rotation, {y: mesh.rotation.y + 10, duration : 1})
    },
    parameter: 'Another param that can not be accessed directly through an object'
}

gui.add(debugObject, 'spin')
gui.add(debugObject, 'parameter')

/*  
******** Updating on change
*/

// Wait until the tweaking is over
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange( () => { generateGalaxy()})

// Update instantly
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onChange( () => { generateGalaxy()})