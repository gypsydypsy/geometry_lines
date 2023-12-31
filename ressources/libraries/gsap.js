import gsap from 'gsap'

// Tween to a new X position
gsap.to(
    mesh.position, 
    {
        duration: 1, 
        delay: 1, 
        ease: 'power2.inOut',
        x: 3,
    }
)

// Rotate a mesh
gsap.to(
    mesh.rotation, 
    {
        x: '+=4',
        y: '+= 2', 
        z: '+= 1.5',
    }
)