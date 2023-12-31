/* 
*   Technique to add a dynamic layer of HTML on top of the scene
    IE : adding points of interest on top of a model
*/

/*  
******** HTML part
*/
`
<div class="point point-0">
    <div class="label">1</div>
    <div class="text">Lorem ipsum dolor sit amet</div>
</div>
<div class="point point-1">
    <div class="label">2</div>
    <div class="text">Lorem ipsum dolor sit amet</div>
</div>
<div class="point point-2">
    <div class="label">2</div>
    <div class="text">Lorem ipsum dolor sit amet</div>
</div>
`

/*  
********* JS part
*/

// 1 - Associate each element to their corresponding 3D position

const points = [
    {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.point-0')
    },     
    {
        position: new THREE.Vector3(0.5, 0.8, - 1.6),
        element: document.querySelector('.point-1')
    }, 
    {
        position: new THREE.Vector3(1.6, - 1.3, - 0.7),
        element: document.querySelector('.point-2')
    }, 
]

// 2 - Create a raycaster

const raycaster = new Raycaster()

// 3 - Test in the render function : 

const render = () =>
{
    /* [...] */
   
    for(const point of points){

        // 1 - Copy the point position
        const screenPosition = point.position.clone();

        // 2 - Transform 3d position into a normalized 2D value (NDC = normalized device coordinates)
        screenPosition.project(camera)

        // 3 - Multiply normalized position by screen actual size
        const translateX = screenPosition.x * window.innerWidth * 0.5
        const translateY = - screenPosition.y * window.innerHeight * 0.5 /* use - bc it's inverted*/

        // 4 - Translate the dom Element accordingly
        point.element.style.transform = `translate(${translateX}px, ${translateY}px)`

        // 5 - Use the raycaster to check if the point should be visible or not

        raycaster.setFromCamera(screenPosition, camera); //NB : screenPosition is a vec3, only the x & y will be used
        const intersects = raycaster.intersectObjects(scene.children, true) // True = also tests the children of the children, recursive
        
        // If no intersection => point is visible
        if(intersects.length === 0){
            point.element.classList.add('visible');
        }
        else {
            const intersectionDistance = intersects[0].distance;
            const pointDistance = point.position.distanceTo(camera.position)

            // If point is closer than the intersect => point is visible too 
            if(pointDistance < intersectionDistance){
                point.element.classList.add('visible');
            }
            else {
                point.element.classList.remove('visible')
            }
        }
    }


    /* [..] */
}
