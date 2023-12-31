/*
****** Adding custom attributes to the geometry
*/

import { Scene } from "three";

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);


const count = geometry.attributes.position.count;

const randoms = new Float32Array(count);

for (let i = 0; i < count; i++){
    randoms[i] = Math.random();
}

geometry.setAttribute('a_random', new THREE.BufferAttribute(randoms, 1))

// By convention, custom attributes starts with a_
// Unlike default attributes like "position", "uv", "uv2"...

// The custom attributes can be retreived in the custom shader


/*
****** Modified materials
*/

// Use case : you want to modify only the vertexShader/fragmentShader, and use Three.js for the other one

const geom = new THREE.BoxGeometry(2, 2, 2, 12, 12, 12);
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geom, material);
scene.add(mesh)

// Debug uniform object

const customUniforms = {
    u_time: {
        value : 0
    }
}

// OnBeforeCompile func 

/*  
*   example : modify the vertex shader with a rotation matrix

*/
material.onBeforeCompile = (shader) => {

    console.log(shader);

    // Add custom uniforms
    shader.uniforms.u_time = customUniforms.u_time;

    // Find where to inject the code in the console.log, and then replace 
    
    /* /!\ Inject the shunks of code in the right order  */

    // Declare the custom uniforms + matrix
    shader.vertexShader = shader.vertexShader.replace('#include <common>', `
        #include <common>
        uniform float u_time;

        mat2 get2dRotateMatrix(float _angle)
        {
            return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
        }
    `)

    // Modify the normals if you have to / want to 
    shader.vertexShader = shader.vertexShader.replace('#include <beginnormal_vertex>', `
        
        #include <beginnormal_vertex>

        float angle = position.y + sin(u_time);
        mat2 rotateMatrix = get2dRotateMatrix(angle);

        objectNormal.xz = rotateMatrix * objectNormal.xz;
    `)

    // Modify the vertex position
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
        
        #include <begin_vertex>
    
        transformed.xz = rotateMatrix * transformed.xz;
    `)

}

// Update the material 

material.needsUpdate = true;

