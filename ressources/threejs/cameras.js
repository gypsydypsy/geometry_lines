/* 
    Different types of cameras 
 
        - Stereo camera : two cameras acting as two eyes, used for VR
        - Cube camera : 6 renders (one per face), used to render scene surroundings
        - Orthographic camera : 2.5d, render with no perspective
        - Perspective camera
*/

/** 
 *********** Perspective camera
*/

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// Params 
/*         
    - field of view (fov) : vertical angle, in degrees
        > if too big, creates distortion bugs
        > 45 to 75 recommended
    - aspect : width / height
    - near : closest position visible
    - far : farthest position visible
*/

// Methods :
camera.lookAt(object) 
object.distanceTo(camera);

/** 
 *********** Orthographic cameras
*/

const aspectRatio = sizes.width / sizes.height;

const orthographicCamera = new THREE.OrthographicCamera(
    -1 * aspectRatio, 
    1 * aspectRatio, 
    -1, 
    1, 
    0.1, 
    100
)

// Params

/*  
    - left
    - right
    - top
    - bottom
    - near
    - far
*/

// As the aspect isn't included in the params, divide left and right (x axis) by the aspect ratio
// to keep the correct proportions



/** 
 *********** Updating the camera's dimensions
*/

 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //Update sizes
    
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
})