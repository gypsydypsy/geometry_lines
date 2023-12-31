/** 
 *********** Loading Manager
*/

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('starting...')
}

loadingManager.onLoad = () => {
    console.log('loaded !')
}

loadingManager.onProgress = () => {
    console.log('in progress...')
}

loadingManager.onError = () => {
    console.log('error !')
}

/** 
 *********** Texture Loader
*/

const textureLoader = new THREE.TextureLoader(loadingManager);


const colorTexture = textureLoader.load(

    'path from the static folder',
    //Loaded function
    () => {
        console.log('loaded')
    }, 
    //In progress function
    () => {
        console.log('progress')
    }, 
    //Errors
    () => {
        console.log('error')
    }
)

/** 
 *********** Cube Texture Loader
*/

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',   
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg',
])

// NB : you can then apply it on a specific 3D object OR/AND in the scene

scene.background = environmentMapTexture
scene.environment = environmentMapTexture // Sets default envmap for all meshs


/** 
 *********** Font Loader
*/

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/font.typeface.json', 
    (typeface) => {
        const textGeometry = new TextGeometry(
            'hello !', 
            {
                font: typeface
            }
        )
    }
)


/** 
 *********** GLTF Loader
*/

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const gltfLoader = new GLTFLoader();

gltfLoader.load('/models/glTF/model/gltf', 
    (gltf) => {
        console.log('loaded !')

        // Option 1 : retreive all the 3D objects in gltf.scene.children

        const objects = [...gltf.scene.children] // /!\ Copy the array or it won't work

        for(let obj of objects){
            scene.add(obj)
        }

        // Option 2 : add the entire scene
        scene.add(gltf.scene)
    }, 
    () => {
        console.log('in progres...')
    }, 
    () => {
        console.log('error')
    }
)


/** 
 *********** DRACO Loader
*/

import  { DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'

const dracoLoader = new DRACOLoader()

// 1. Copy the draco files from three/examples/js/libs/draco in the static folder

// 2. Set the path to the copied folder
dracoLoader.setDecoderPath('/draco/');

// 3. Link the dracoLoader to a regular gltf Loader
gltfLoader.setDRACOLoader(dracoLoader)

// 4. Load the dracoFiles with the GLTF Loader