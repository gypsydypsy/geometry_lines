/*  
  Types of geometries : 

        > BoxBGeometry
        > PlaneGeometry
        > CircleGeometry
        > ConeGeometry
        > CylinderGeometry
        > RingGeometry
        > TorusGeometry
        > TorusGeometry
        > DodecahedronGeometry
        > OctohedronGeometry
        > TetrahedronGeometry
        > SphereGeometry
        > ShapeGeometry : based on curves
        > TubeGeomery : follows geometry
        > LatheGeomtry : forme d'antenne satelite
        > TextGeometry : see 3D Text
*/

/** 
 *********** Custom Buffer Geometry
*/

const customGeometry = new THREE.BufferGeometry();

const count = 50; // number of vertices
const positions = new Float32Array(count * 3) // Special typed array used to create buffer attributes

for(let i = 0; i < 50 * 3; i ++){
    positions[i] = Math.random()
}

customGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))