/* 

    // Unaffected by light  

        - Basic Material : the most basic material of three.js

        - Normal Material : translates the normal map to rgb colors
            > often used for debug
            NB : normals are needed for lightening, relfection, refraction

        - Matcap Material : used to replicate lights without lights
            > not physically correct but fast and efficiant
            > Needs a matcap material

        - Depth Material : Objects will appear white if they are close to the camera
                            and black if they are far
            > Used for very specific cases : ie creating fog

    // Affected by light 

        - Lambert Material : an non physically based meterial (Lambertian Model)
            > Can simulate rough surfaces very well
            > Bad for shiny surfaces
        
        - PhongMaterial : non physically correct (phong model)
            > Less performant than lambert
            > but can do shiny surfaces

        - Toon Material : cartoon like material with sharp color changes
            > To be used with a gradient map

        - Standard Material : this most realistic render
            > uses physics based rendering
            > can similuate roughness, metalness, shinyness

        - Physical Material : Same as standard material but adds a clearcoat to the object

    // Special Materials
        
        - Points Material : Very specific material that enables the use of vertices as point coordinates
            > Used to create particles effect (fire, galaxy...)
            > See particles.js
        - Shader / Rawshader material : enables the use of custom shaders
*/

/*  
* ********* Materials common properties
*/

const material = new THREE.MeshBasicMaterial({
    alphaTest : 0.5,                    // The material won't be rendered if the opacity is below the given value
    blending : THREE.NormalBlending,    // default, or THREE.NoBlending, THREE.AdditiveBlending, THREE.SubstractiveBlending, THREE.MultiplyBlending
    colorWrite: true,                   // Wheither the material's color should be rendered
    depthWrite: true,                   // If false, removes the material from the depth buffer. Can be used to fixed render layer issues / transparency
    opacity: 0.5,                       // default 1
    shadowSide : THREE.FrontSide,       // default, or THREE.BackSide, THREE.DoubleSide
    side : THREE.FrontSide,             // same
    toneMapped : true,                  // Weither the material is affected by the renderer's tone mappiung
    transparent: true, 
    vertexColors: true,                 // default is false, if set to true, enable the use of colors as a buffer attribute in the geometry
    visible: true,
})


/*  
* ********* Materials methods
*/

material.clone()
material.color.copy(anotherMaterial.color)
material.dispose() /* doesn't dispose the textures used in the material */
material.onBeforeCompile()


/** 
 *********** Basic Material
*/

const basicMaterial = new THREE.MeshBasicMaterial({

    /* Alpha */
    alphaMap: alphaTexture, 

    /* Ambient Occlusion */
    aoMap: aoTexture,       // Requires 2nd Uvs
    aoMapIntensity: 0.5,    // How much the aoMap affects the surface, 0 to 1, default 1

    /* Color */
    color: new THREE.Color('red'),

    /* EnvMap */
    envMap : envTexture,
    combine: THREE.MultiplyOperation,   // DEfines how the envMap combines with the surface's color
                                        // default, of THREE.MixOperation, THREE.AddOperation 
    reflectivity : 1,   // if Mix is chosen above, defines the ratio of the mix
                        // Default is 1, 0 to 1
   
    /* Light Map */
    lightMap: lightTexture, // Requires 2nd UVs
    lightMapIntensity: 0.5, // 0 to 1, default 1

    /* Specular map */
    specularMap: specularTexture,

    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher

    /* Fog */
    fog: true, // Weither or not the material is affected by fog 
})


/** 
 *********** Normal Material
*/

const normalMaterial = new THREE.MeshNormalMaterial({

    /* BumpMap */
    bumpMap: bumpTexture, 
    bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)
    
    /* Flatshading */
    flatShading: true, // Show "faces" instead of a smooth surface

    /* Normalmap */
    normalMap: normalTexture, 
    normalScale : 1, // How mush to normalmap affects the texture, default 1
    
    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher

    /* Fog */
    fog: true, // Weither or not the material is affected by fog 
})


/** 
 *********** Matcap Material
*/

const matcapMaterial = new THREE.MeshMatcapMaterial({

    /* Alpha */
    alphaMap: alphaTexture,
    
    /* BumpMap */
    bumpMap: bumpTexture, 
    bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1

    /* Color */
    color: new THREE.Color('red'),

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)

    /* Flatshading */
    flatShading: true, // Show "faces" instead of a smooth surface

    /* Fog */
    fog: true, // Weither or not the material is affected by fog 

    /* Map */
    map: colorTexture, 

    /* MatCap */
    matcap: matcapTexture, // Matcap is a special kind of texture for simulating light

    /* Normalmap */
    normalMap: normalTexture, 
    normalScale : 1, // How mush to normalmap affects the texture, default 1
     
})


/** 
 *********** Toon Material
*/

/*  GradientMap is a special texture that is actually not a gradient, it is a set of 3 to 5 distinct color pixels that are used
    to create a material with very harsh color changes 
/!\ Three.js automatically smooths the gradient texture because of mipmapping 
    In order to avoid this, apply those filters to the texture : 
*/

gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const toonMaterial = new THREE.MeshToonMaterial({

    /* Alpha */
    alphaMap: alphaTexture,

    /* Ambient Occlusion */
    aoMap: aoTexture,       // Requires 2nd Uvs
    aoMapIntensity: 0.5,    // How much the aoMap affects the surface, 0 to 1, default 1

    /* BumpMap */
    bumpMap: bumpTexture, 
    bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1

    /* Color */
    color: new THREE.Color('red'),

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)

    /* Emissive */
    emissive: new THREE.Color('red'),   // The color emmited by the surface, default black
    emissiveMap: emissiveTexture,       // if using emisssiveMap, don't use the emissive param
    emissiveIntensity: 1, // 0 to 1, default 1

    /* Fog */
    fog: true,

    /* GradientMap */
    gradientMap: gradientTexture, // Requires to set min and mag filters, see abose

    /* Light Map */
    lightMap: lightTexture, // Requires 2nd UVs
    lightMapIntensity: 0.5, // 0 to 1, default 1

    /* Map */
    map: colorTexture, 

    /* Normalmap */
    normalMap: normalTexture, 
    normalScale : 1, // How mush to normalmap affects the texture, default 1

    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher
})


/** 
 *********** Depth Material
*/

const depthMaterial = new THREE.MeshDepthMaterial({
    /* Alpha */
    alphaMap: alphaTexture,

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)

    /* Fog */
    fog: true,

    /* Map */
    map: colorTexture, 

    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher
})


/** 
 *********** Lambert Material
*/

const lambertMaterial = new THREE.MeshLambertMaterial({
    /* Alpha */
    alphaMap: alphaTexture, 

    /* Ambient Occlusion */
    aoMap: aoTexture,       // Requires 2nd Uvs
    aoMapIntensity: 0.5,    // How much the aoMap affects the surface, 0 to 1, default 1
    
    /* BumpMap */
    bumpMap: bumpTexture, 
    bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1

    /* Color */
    color: new THREE.Color('red'),

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)

    /* Emissive */
    emissive: new THREE.Color('red'),   // The color emmited by the surface, default black
    emissiveMap: emissiveTexture,       // if using emisssiveMap, don't use the emissive param
    emissiveIntensity: 1, // 0 to 1, default 1

    /* EnvMap */
    envMap : envTexture,
    combine: THREE.MultiplyOperation,   // DEfines how the envMap combines with the surface's color
                                        // default, of THREE.MixOperation, THREE.AddOperation 
    reflectivity : 1,   // if Mix is chosen above, defines the ratio of the mix
                        // Default is 1, 0 to 1
    
    /* Flatshading */
    flatShading: true, // Show "faces" instead of a smooth surface
    
    /* Fog */
    fog: true, // Weither or not the material is affected by fog 

    /* Light Map */
    lightMap: lightTexture, // Requires 2nd UVs
    lightMapIntensity: 0.5, // 0 to 1, default 1
    
    /* Map */
    map: colorTexture, 
    
    /* Normalmap */
    normalMap: normalTexture, 
    normalScale : 1, // How mush to normalmap affects the texture, default 1
      
    /* Specular map */
    specularMap: specularTexture,

    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher
})

/** 
 *********** Phong Material
*/

const phongMaterial = new THREE.MeshPhongMaterial({
    /* Alpha */
    alphaMap: alphaTexture, 

    /* Ambient Occlusion */
    aoMap: aoTexture,       // Requires 2nd Uvs
    aoMapIntensity: 0.5,    // How much the aoMap affects the surface, 0 to 1, default 1
    
    /* BumpMap */
    bumpMap: bumpTexture, 
    bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1

    /* Color */
    color: new THREE.Color('red'),

    /* Displacement Map / Height map */
    displacementMap: displacementTexture, 
    displacementScale: 1,   // 0 to 1
    displacementBias: 0,    // Defines the offset of the displacementMap
                            // Default is 0 (no offest)

    /* Emissive */
    emissive: new THREE.Color('red'),   // The color emmited by the surface, default black
    emissiveMap: emissiveTexture,       // if using emisssiveMap, don't use the emissive param
    emissiveIntensity: 1, // 0 to 1, default 1

    /* EnvMap */
    envMap : envTexture,
    combine: THREE.MultiplyOperation,   // DEfines how the envMap combines with the surface's color
                                        // default, of THREE.MixOperation, THREE.AddOperation 
    reflectivity : 1,   // if Mix is chosen above, defines the ratio of the mix
                        // Default is 1, 0 to 1
    
    /* Flatshading */
    flatShading: true, // Show "faces" instead of a smooth surface
    
    /* Fog */
    fog: true, // Weither or not the material is affected by fog 

    /* Light Map */
    lightMap: lightTexture, // Requires 2nd UVs
    lightMapIntensity: 0.5, // 0 to 1, default 1
    
    /* Map */
    map: colorTexture, 
    
    /* Normalmap */
    normalMap: normalTexture, 
    normalScale : 1, // How mush to normalmap affects the texture, default 1
    
    /* Shininess */
    shininess: 30, // default 30, the higher the shinier

    /* Specular */
    specular: new THREE.Color('white'), // color of the specular light
    specularMap: specularTexture,       // Don't combine with specular property

    /* Wireframes */
    wireframe: true, 
    wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
    wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
    wireframeLineWidth: 0.9,    // default 1, can be higher
})

/** 
 *********** Standard Material
*/

const standardMaterial = new THREE.MeshStandardMaterial({
     /* Alpha */
     alphaMap: alphaTexture, 

     /* Ambient Occlusion */
     aoMap: aoTexture,       // Requires 2nd Uvs
     aoMapIntensity: 0.5,    // How much the aoMap affects the surface, 0 to 1, default 1
     
     /* BumpMap */
     bumpMap: bumpTexture, 
     bumpScale: 1, // How much the bump map affects the material, 0 to 1, default 1
 
     /* Color */
     color: new THREE.Color('red'),
 
     /* Displacement Map / Height map */
     displacementMap: displacementTexture, 
     displacementScale: 1,   // 0 to 1
     displacementBias: 0,    // Defines the offset of the displacementMap
                             // Default is 0 (no offest)
 
     /* Emissive */
     emissive: new THREE.Color('red'),   // The color emmited by the surface, default black
     emissiveMap: emissiveTexture,       // if using emisssiveMap, don't use the emissive param
     emissiveIntensity: 1, // 0 to 1, default 1
 
     /* EnvMap */
     envMap : envTexture,
     combine: THREE.MultiplyOperation,   // DEfines how the envMap combines with the surface's color
                                         // default, of THREE.MixOperation, THREE.AddOperation 
     reflectivity : 1,   // if Mix is chosen above, defines the ratio of the mix
                         // Default is 1, 0 to 1
     
     /* Flatshading */
     flatShading: true, // Show "faces" instead of a smooth surface
     
     /* Fog */
     fog: true, // Weither or not the material is affected by fog 
 
     /* Light Map */
     lightMap: lightTexture, // Requires 2nd UVs
     lightMapIntensity: 0.5, // 0 to 1, default 1
     
     /* Map */
     map: colorTexture, 
     
     /* Metalness */
     metalness: 0, // Default 0, 0 to 1
     metalnessMap: metalnessTexture, 

     /* Normalmap */
     normalMap: normalTexture, 
     normalScale : 1, // How mush to normalmap affects the texture, default 1
     
     /* Rougness */
     roughness: 1, // default 1, 0 to 1
     roughnessMap: roughnessTexture,

     /* Shininess */
     shininess: 30, // default 30, the higher the shinier
 
     /* Specular */
     specular: new THREE.Color('white'), // color of the specular light
     specularMap: specularTexture,       // Don't combine with specular property
 
     /* Wireframes */
     wireframe: true, 
     wireframeLinecap: 'round',  // 'round' (default) | 'butt' | 'square'
     wireframeLineJoin: 'round', // 'round (default) | 'bevel' | 'miter'
     wireframeLineWidth: 0.9,    // default 1, can be higher
})

/** 
 *********** Physical Material
*/

const physicalMaterial = new THREE.MeshPhysicalMaterial({
    /* Includes all properties from Mesh Standard material */

    /* Attenuation */
    attenuationColor: new THREE.Color('white'),     // The color that white lights turns into due to absorption when reaching the attenuation distance
                                                    // Default white
    attenuationDistance: 0,                         // Average distance that lights travels through the surface, default 0, value in world space

    /* Clearcoat */
    clearcoat: 0,                               // default 0, 0 to 1, intensity of the clearcoat layer
    clearcoatMap: clearcoatTexture, 
    clearcoatNormalMap: clearcoatnormalTexture, // Enables different normals for the clearcoat
    clearcoatNormalScale: 1,                    // default 1, 0 to 1, defines how much the normal map affects the clearcoat layer
    clearcoatRoughness: 0,                      // 0 to 1, default 0
    clearcoatRoughnessMap: clearcoatroughnessTexture, 
    
    /* Ior */
    ior: 1.5, // From 1, to 2.33, default 1.5, index-of-refraction for non-metallic materials

    /* Reflectiviy */
    reflectivity: 0.5,  // default 0.5, from 0 to 1,  
                        // 0.5 correponds to an ior of 1.5
                        // Has no effect when metalness is 1

    /* Sheen */ // Sheen is like the top surface of the clearcoat, 'éclat' en français
    sheen: 0, // 0 to 1, default 0, intensity of the sheen layer
    sheenRoughness: 1.0, // 0 to 1, default 1
    sheenRoughnessMap: sheenRoughnessTexture, 
    sheenColor: new THREE.Color('white'),
    sheenColorMap: sheenColorMapTexture, 

    /* Specular light */
    specularIntensity: 0, // 0 to 1, default 0
    specularColor: new THREE.Color('red'),
    specularIntensityMap: specularIntensityTexture, 
    specularColorMap: specularColorTexture,

    /* Thickness */
    thickness: 0, // Thickness of the volume beneath the surface, default 0
    thicknessMap: thicknessTexture, 

    /* Transmision */
    transmission: 0,    // 0 to 1, default 0
                        // Almost like opacity, transmission means optical transparency
                        // Unlike opacity, clearcoat materials are semi-transparent + reflective
                        // If transmission !== 0, opacity should be set to 0
    transmissionMap: transmisisonTexture




})              