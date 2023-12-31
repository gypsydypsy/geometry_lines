#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_mouse;

varying vec3 v_normal;
varying vec2 v_uv;
varying vec3 v_position;


void main () {
    v_normal = normal;
    v_uv = uv;
    v_position = position;
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
}