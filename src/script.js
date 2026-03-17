import './style.css'
import * as THREE from 'three';
import GUI from 'lil-gui'
import vertex from '../shaders/vertexShader.glsl';
import fragment from '../shaders/fragmentShader.glsl';


/* 
** 
************ PARAMS 
**
*/

// -- Canvas
const canvas = document.querySelector('#canvas');

// -- Sizes 
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// -- Cursor 
const cursor = {
  x: 0,
  y: 0
}


/* 
** 
************ SET UP 
**
*/

// -- Scene
const scene = new THREE.Scene();

// -- Camera
//const camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100 );
camera.position.set(0, 0, 3)
scene.add(camera);


// -- Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// -- Clock
const clock = new THREE.Clock();

/*  
**
************* MESH
**
*/

const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const material = new THREE.ShaderMaterial({
  blending: THREE.AdditiveBlending,
  vertexShader: vertex,
  fragmentShader: fragment, 
  transparent: true,
  uniforms: {
    u_time : {
      value: clock.getElapsedTime(),
    }, 
    u_resolution : {
      value: [sizes.width, sizes.height]
    },
    u_mouse : {
      value : [cursor.x, cursor.y]
    }, 
    u_nthShapes: {
      value: 30
    }, 
    u_nthSides: {
      value: 3
    }, 
    u_rotation: {
      value: 0.005
    }, 
    u_thickness: {
      value: 0.007
    },
    u_size: {
      value: 0.08
    },
    u_color1 : {
      value: new THREE.Color(0x810404)
    },
    u_color2 : {
      value: new THREE.Color(0x0a1510)
    }
  }
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


/*  
**
************ RENDER
**
*/

const render = () => 
{   
  // update uniforms
  material.uniforms.u_time.value = clock.getElapsedTime();  
  
  // animate
  renderer.render(scene,camera);
  window.requestAnimationFrame(render);
}

render();


/*  
**
************ EVENTS
**
*/

// -- Mouse event
window.addEventListener('mousemove', (e) => {
  
  // Update cursor
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = 1 - (e.clientY / sizes.height) - 0.5;

  //Update uniform
  material.uniforms.u_mouse.value = [cursor.x, cursor.y];
})


// -- Resize event
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //Update uniform
    material.uniforms.u_resolution.value = [sizes.width, sizes.height]
})


// -- DoubleClick : enable fullScreen
window.addEventListener('dblclick', () => 
{
  // Prefix for safari
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  
  if(!fullscreenElement)
  {
      if(canvas.requestFullscreen) canvas.requestFullscreen()
      else if(canvas.webkitrequestFullScreen) canvas.webkitFullscreen()
  }
  else 
  {
      if(document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  }
})


/*  
**
************ DEBUG
**
*/

const gui = new GUI();
gui.add(material.uniforms.u_nthShapes, 'value').min(1).max(50).step(1).name('nbr of shapes')
gui.add(material.uniforms.u_nthSides, 'value').min(1).max(50).step(1).name('nbr of sides')
gui.add(material.uniforms.u_rotation, 'value').min(0).max(10).step(0.001).name('rotation')
gui.add(material.uniforms.u_size, 'value').min(-1).max(100).step(0.01).name('size')
gui.add(material.uniforms.u_thickness, 'value').min(0.001).max(0.5).step(0.001).name('thickness')
gui.addColor(material.uniforms.u_color1, 'value').name('Color 1')
gui.addColor(material.uniforms.u_color2, 'value').name('Color 2')