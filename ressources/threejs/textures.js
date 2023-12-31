/*  
    Types of textures : 

        - color texture (albedo)

        - alpha texture : grayscale image for transparency 
            > white : visible
            > black : transparent

        - bumpMap : grayscale for depth : 
            > white : goes up,
            > black : goes down,
            /!\ Unlike heightMapn, this texture doesn't actually affects the geometry, 
                it just simulates depth
            
        - height (displacement) : grayscale for depth
            > white : goes up
            > black : goes down
            /!\ use enough vertices in the geometry or it won't work

        - normal map : used to orientate the surface of the geometry
            > used for light reflection

        - ambient occlusion : grayscale to add fake shadows on the geometry
            /!\ must be used with uv2

        - metallness :
            > black : metal
            > white : not metal

        - roughness: grayscale to determine shinyness of the geometry
            > white : rough, 
            > black : smooth

        - gradient : a special texture for ToonMaterial
            > It must actually not be a gradient, but sharp color changes (usually between 3 and 5 pixels)

        - envMap : textures in 6 parts to create the surroundings of the scene

        - matCapTexture : a special texture to use with matCap Material, 
            > not physically correct but can replicate light a low CPU cost
*/

/** 
 *********** Texture optimization
*/

/*  
    - use jpg preferably
    - compress textures if you use a lot (tinypng.com)
    - Resize the textures according to your needs
    - Use textures with power of two sizes: 512x512, 1024x1024, 2048x2048
*/


/** 
 *********** Applying textures on a material
*/

const standardMaterial = new THREE.MeshStandardMaterial({

    // /* Color Texture / Albeido */
    map: colorTexture,
    
    // /* AmbientOcclusion */
    aoMap: ambientOcclusionTexture, // To use aoMap, you must duplicate Uvs on the geometry (see below)
    aoMapIntensity: 1,
    
    // /* Height/displacement */
    displacementMap: heightTexture, 
    displacementScale: 0.05,
    
    // /* Metalness / roughness */
    metalnessMap: metalnessTexture,  // Don't combine the maps with metalness/roughnessparams
    roughnessMap: roughnessTexture, // Don't combine the maps with metalness/roughnessparams
    
    // /* Normal map */
    normalMap: normalTexture, 
    normalScale: new THREE.Vector2(0.5, 0.5),
    
    // /* Alpha map */
    transparent: true, // Enable transparency if using alphaMap
    alphaMap: alphaTexture,
    
    /* EnvMap */
    envMap: environmentMapTexture
})  

// Duplicated UVs for AOMAP
geometry.setAttribute('uv2', new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2))


/** 
 *********** Texture transformation
*/

// Repeat
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;

// /!\ to use repeat, you must set the wrapS/wrapT properties 
colorTexture.wrapS = THREE.RepeatWrapping; 
colorTexture.wrapT = THREE.MirroredRepeatWrapping;

//Offset
colorTexture.offset.x = 0.5
colorTexture.offset.y = 0.5

// Rotation
colorTexture.rotation = Math.PI * 0.25
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;

/** 
 *********** Filtering & Mipmapping
*/

/*  
    Mipmapping is an automatic process in Three.js
    Three.js duplicates the texture into various sizes (from the original size down to 1x1)
    and then chooses the right one according to the geometry size on screen


    To have control over this automatic process, you can use filters

        - Mag filter : defines the behavior of the texture when it is too small and needs to be stretched
        - Min filter : // when it is too big and needs to be shrunk

    Different filter alogrythms : 

        - LinearFilter : default, returns the weighted average of the four nearest texture coordinates
        - NearestFilter : returns the value of the nearest matching texture coordinates 
        
        // Min filter only : 

        - NearestMipMapLinearFilter 
        - NearestMiMapNearestFilter 
        - LinearMipMapNearestFilter    
        - LinearMipMapLinearFilter 
*/

colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// NB : you can disable automatique mipmaping when using filters that don't need it (i.e nearest filter)

colorTexture.generateMipmaps = false; 


/** 
 *********** Texture Encoding
*/

// Nb if encoding is set after the texture has been used, you need to call Material.needsUpdate = true

colorTexture.encoding = THREE.LinearEncoding  // default one, "robotic" not very realistic
colorTexture.encoding = THREE.sRGBEncoding    // closest to how our eyes actually perceive light

standardMaterial.needsUpdate = true;