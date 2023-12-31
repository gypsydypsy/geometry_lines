#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_nthShapes;
uniform float u_nthSides;
uniform float u_rotation;
uniform vec3 u_color1; 
uniform vec3 u_color2; 
uniform float u_size; 
uniform float u_thickness;
uniform float u_diff; 

varying vec3 v_normal;
varying vec2 v_uv;  
varying vec3 v_position;

float shape(in vec2 _pos, float _nbrSides, float _rot, float _size){

    float TWO_PI = 6.28318530718;
    float a = atan(_pos.x, _pos.y) + _rot;
    float r = TWO_PI / float(_nbrSides);
    float s = (cos(floor(.5+a/r)*r-a)*length(_pos / (1. + _size)));
    return s;
}

void main (){

    vec2 st = v_position.xy * 2.5;

    vec3 shapes = vec3(0.);
   // float    = 1.;

    for(float i = 1.; i <= u_nthShapes; ++i)
    {   
        //    float size = u_size / i;
        //    float rotation = u_rotation * i;

        //    float t = shape(v_position.xy, u_nthSides, 3.14 * rotation);
        //    t *= size;

        //    float maxx = 1. / u_nthShapes * i;
        //    float minn = maxx - u_thickness;
        //    float diff = 0.002;

        //    t = smoothstep(minn, minn + diff, t) - smoothstep(maxx, maxx + diff, t);
        //    shapes += t * mix(u_color1, u_color2, i * 0.05);       
     
           float rotation = u_rotation * i;

           float size = (i - 1.) * u_size; 
           float t = shape(st, u_nthSides, 3.14 * rotation, size);

           float maxx = 0.8;
           float minn = maxx - u_thickness;
           float diff = 0.001;

           t = smoothstep(minn, minn + diff, t) - smoothstep(maxx, maxx + diff, t);
           shapes += t * mix(u_color1, u_color2, (1./ u_nthSides) * i);       
            //shapes += t * vec3( 1., 0., 0.);
    }

    gl_FragColor = vec4(shapes, 1.);
}