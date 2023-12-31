/*  
*   Raycasters are used to detect collision : 
        > Interaction with the mouse, 
        > Test if a laser gun hits something, 
        > Detect if the player hits a wall 
*/

/*  
********** Init Rayscaster
*/

const raycaster = new THREE.Raycaster();

const rayOrigin = new THREE.Vector3(0, 0, 0)
const rayDirection = new THREE.Vector3(4, 5, 5)
rayDirection.normalize() // /!\ rayDirection must be normalized ! 

raycaster.set(rayOrigin, rayDirection)

/*  
********** Test intersection(s)
*/

// Single intersection

const intersect = raycaster.intersectObject(object);

// Multiple intersection

const intersects = raycaster.intersectObjects([object1, object2, object3])

/* 
        Single intersection will return the first (or only) object intersected 
        Multiple intersections will return an array of objects

        Info provided : 
                > distance between the rayOrigin and the interection
                > Point coordinates of the intersection
                > UV coordinates of the intersection 
*/


/*  
********** Recreate mouse events
*/

// Mousemove : get the position of the mouse

let mouse = new THREE.Vector2()

window.addEventListener('mousemove', (e) => {
        
        //Normalize mouse position on a -1 to 1 range
        const x = e.clientX / window.innerWidth * 2 - 1;
        const y = - e.clientY / window.innerHeight * 2 - 1;
        
        mouse.x = x
        mouse.y = y
})

// Test intersection in the render function

let currentIntersect = null; 

const render = () => {

        /* [...] */

        // Set the mouse as the rayOrigin and the camera as the rayDirection
        // Use the special method set from camera to be able to use the camera directly as a param
        raycaster.setFromCamera(mouse, camera)

        // Test object
        const intersects = raycaster.intersectObjects([object1, object2, object3])

        for(let intersect of intersects){
                console.log(`Object ${intersect.object} has been intersected`)
        }


        // Mouse enter and mouse leave

        if(intersects.length > 0){
                if(currentIntersect === null) console.log('mouse enter')
                currentIntersect = intersect[0]
        }
        else {
                if(currentIntersect) console.log('mouseleave')
                currentIntersect = null
        }
}

// Click event

window.addEventListener('click', (e) => {
        if(currentIntersect) console.log('click')
})
