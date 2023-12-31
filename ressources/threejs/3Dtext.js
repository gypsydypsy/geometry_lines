/*  
*   To use textBufferGeometry, must use a typeface font
*   Two ways : 
        - Convert an existing font (outputs js or json) : http://gero3.github.io/facetype.js/
        - Use THREE.JS fonts (nodes_modules/three/examples/fonts)
*/

/*
*********** Text Geometry
*/

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const fontLoader = new FontLoader()
let textGeometry = null;

fontLoader.load(
    '/fonts/font.typeface.json', 

    (typeface) => {
        textGeometry = new TextGeometry(
            'Hello World',
            {
                font: typeface,         // Must be an instance of THREE.Font
                size: 0.5,              // default 100
                height: 0.2,            // default 50
                curveSegments: 5,       // Number of points on the curves, used for optimizing round letters
                                        // default 12
                bevelEnabled: true,     // = Biseaux
                                        // True permet de créer des effets d'arrondis sur les lettres à coins
                bevelThickness: 0.03,   // Profondeur du bevel sur Z, default 10
                bevelSize: 0.02,        // Epaisseur des lettres (sur x et y)
                bevelOffset: 0,         // Default 0
                bevelSegments: 5        // Default 3
            }
        )

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text);            
    }
)


/*
*********** Bounding Box
*/

/*  
*       The bounding box is the delimitation of the 3D object (sphere of box)
        Allows to get the exact size of a text geometry
*/

textGeometry.computeBoundingBox() // Tells Three js to calculate the bounding box, not done by default

/* /!\  the use of bevel thickness creates an offset on the z axis 
        the use of bevel size creates an offset on x & y axis
        
        => The size given by the boundingbox could be slightly incorrect
*/

/*
*********** Methods
*/

textGeometry.center();
textGeometry.translate()