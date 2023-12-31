// --------------- Fonctions utiles
y = mod(x,0.5); // renvoie x modulo 0.5
y = fract(x); // renvoie uniquement la partie fractionnelle d'un chiffre (les chiffres après la virgule)
y = ceil(x);  // renvoie le plus proche entier supérieur ou égal à x
y = floor(x); // renvoie le plus proche entier inférieur ou égal à x
y = sign(x);  // renvoie le signe de x (-1 ou 1)
y = abs(x);   // renvoie la valeur absolue de x
y = clamp(x,0.0,1.0); // force x à se retrouver entre 0.0 et 1.0
y = min(0.0,x);   // renvoie le plus petit chiffre entre 0 et x

// --------------- Tracer une ligne
float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

// --------------- Tracer un cercle
float circle(in vec2 _st, in float _radius, in vec2 _center){
    vec2 dist = _st- _center;
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

// --------------- Tracer un polygone à N côtés
float shape(in vec2 pos, int nbrOfSides, float rotation){

    float TWO_PI = 6.28318530718;
    float a = atan(pos.x, pos.y) + rotation;
    float r = TWO_PI / float(nbrOfSides);

    float s = cos(floor(.5+a/r)*r-a)*length(pos);

    return s;
}

// --------------- Tracer un quadrilatère
float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

// --------------- Tracer une croix
float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

// ---------------- Transformer le plan en grille 
vec2 makeGrid(in vec2 _st, in vec2 _dimensions){
    
    _st *= _dimensions;
    _st = fract(_st);

    return _st;
}

// ---------------- Dessiner des briques (motifs décalés)
// /!\ Attention à utiliser dans une grille
vec2 brickTile(vec2 _st, float _zoom){
    _st *= _zoom;

    _st.x += step(1., mod(_st.y,2.0)) * 0.5;

    return fract(_st);
}

// ------------------ Hexagonal grid
vec4 hexCoords (vec2 _uv, float _scale){
    _uv = _uv - 0.5;
    _uv *= _scale;

    vec2 ratio = vec2(1., 1.73);
    vec2 h = ratio * 0.5;

    vec2 grid1 = mod(_uv, ratio) - h; // - h to retreive a -0.5 > 0.5
    vec2 grid2 = mod(_uv - h, ratio) - h; // Add h as offset to 2nd;

    // Check which grid we are closest to
    vec2 grid;
    vec2 id;
    if(length(grid1) < length(grid2)){
        grid = grid1;
    }
    else {
        grid = grid2;
    }

    id = _uv - grid ;

    return vec4(grid, id);
}

// --------------- Matrice de rotation 2D
// NB : attention à faire une translation de st avant et après utilisation 
// st -= vec2(0.5); puis st += vec2(0.5);
// NB2 : à utiliser en multipliant avec st : st = rotate2D(a) * st; 
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

// --------------- Matrice de changement d'échelle
// Idem que matrice rotation
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

// --------------- RGB vers HSL
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                d / (q.x + e),
                q.x);
}

// --------------- HSL vers RGB
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

// ---------------- YUV vers RGB
// Les valeurs uv vont de -1 à 1, remapper st avant utilisation
//st = st * 2. - 1.;
mat3 yuv2rgb = mat3(1.0, 0.0, 1.13983,
                    1.0, -0.39465, -0.58060,
                    1.0, 2.03211, 0.0);

// ---------------- RGB vers YUV 
mat3 rgb2yuv = mat3(0.2126, 0.7152, 0.0722,
                    -0.09991, -0.33609, 0.43600,
                    0.615, -0.5586, -0.05639);

// ----------------- RANDOM 1D
// Donne un nombre aléatoire entre 0 et 1 à partir d'un float
// Random déterministe, random(X) sera toujours le même
// Pour un résultat plus aléatoire, faire varier le dernier multiplicateur en fonction du temps
float random1D (float st) {
    return fract(sin(dot(vec2(st),
                         vec2(12.9898,78.233)))*
        43758.5453123);

}

// ---------------- RANDOM 2D
float random2D (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// ---------------- RANDOM VEC2
// Use with gradient noise
vec2 randomVec2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}
//ou celle la 
vec2 randomVec2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

// ---------------- NOISE 1D 
float noise1D(float _st) {
    
    float i = floor(_st);
    float f = fract(_st);

    float u = smoothstep(0., 1., f);

    // Noise 1D
    float y = mix(random1D(i), random1D(i+1.), u);

    return y;
}

// ---------------- NOISE 2D 
float noise2D (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random2D(i);
    float b = random2D(i + vec2(1.0, 0.0));
    float c = random2D(i + vec2(0.0, 1.0));
    float d = random2D(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

// -------------------- CLASSIC PERLIN NOISE (2D)
//
//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float pnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// -------------- GRADIENT NOISE
// !== value noise
// gradient noise interporlates gradients(vec2) instead of values.
// Use with vec2 random
float gnoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( randomVec2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( randomVec2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( randomVec2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( randomVec2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}


// -------------- SIMPLEX GRID
vec2 simplexSkew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

vec3 simplexGrid (vec2 st) {
    vec3 xyz = vec3(0.0);

    vec2 p = fract(simplexSkew(st));
    if (p.x > p.y) {
        xyz.xy = 1.0-vec2(p.x,p.y-p.x);
        xyz.z = p.y;
    } else {
        xyz.yz = 1.0-vec2(p.x-p.y,p.y);
        xyz.x = p.x;
    }

    return fract(xyz);
}

// ------------------ SIMPLEX NOISE
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// --------------------- NOISE 3D 
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise3D(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

// ----------------- CLASSIC 3D PERLIN NOISE
//	Classic Perlin 3D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

// -------------------- FBM
float fbm (in vec2 st) {
    
    // Initial values (can be changed)
    float value = 0.0;
    float amplitude = .5;
    float frequency = 2.;
    int octaves = 6;

    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
        value += amplitude * noise2D(st);
        st *= frequency;
        amplitude *= .5;
    }
    
    return value;
}

// --------------------- FBM with reduced bias
float fbm ( in vec2 _st) {

    #define NUM_OCTAVES 5

    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);

    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));

    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise2D(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// -------------------- Ridge FBM
// Use with simplex noise
float ridgeFM(vec2 p) {
    #define OCTAVES 4
    float lacunarity = 2.0;
    float gain = 0.5;
    float offset = 0.9;

    float sum = 0.0;
    float freq = 1.0;
    float amp = 0.5;
    float prev = 1.0;
    
    for(int i=0; i < OCTAVES; i++) {
        
        float n = abs(snoise(p*freq));
        n = offset - n;
        n = n*n;
        
        sum += n*amp;
        sum += n*amp*prev;  // scale by previous octave
        prev = n;
        freq *= lacunarity;
        amp *= gain;
    }
    return sum;
}

// --------------------- LIGHTENING 
/*  
//Varryings needed: 
    - v_fragPosV : (modelViewMatrix * vec4(position, 1.)).xyz;
    - v_normalV : normalize((modelViewMatrix * vec4(normal, 0.)).xyz);
*/
// Prop _lightPosV must be light position in the viewModel : 
// => _lightPosV : (viewMatrix * vec4(u_lightPosition, 1.)).xyz; 

vec3 diffuseLight(in vec3 _lightPosV, in float _lightIntensity, in vec3 _lightColor){

    vec3 lightDirection = normalize(_lightPosV - v_fragPosV);
    float distanceFromLight = distance(v_fragPosV, _lightPosV);
    float angle = clamp(dot(v_normalV, lightDirection), 0., 1.);

    vec3 light = (_lightColor * _lightIntensity * angle ) / sqrt(distanceFromLight / 10.);
    
    return light;
}

vec3 refl(in vec3 _norm, in vec3 _lightDir){
    return 2. * dot(_norm, _lightDir) * _norm - _lightDir;
}

vec3 specularLight(in vec3 _lightPos, in float _lightIntensity){

    vec3 specColor = vec3(1.);
    vec3 cameraPosition = vec3(0.);
    vec3 lightDirection = normalize(v_lightPosV - v_fragPosV);
    vec3 cameraDirection = normalize(cameraPosition - v_fragPosV);

    float distanceFromLight = distance(v_lightPosV, v_fragPosV);

    vec3 reflectionVector = refl(v_normalV, lightDirection);

    float angle = clamp(dot(reflectionVector, cameraDirection), 0. ,1.);

    vec3 light = specColor * pow(angle, _lightIntensity) / sqrt(distanceFromLight / 10.);

    return light;
}