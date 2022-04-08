#pragma glslify:snoise3=require(glsl-noise/simplex/3d)

uniform float uTime;

varying vec2 vUv;
varying float vWave;

void main(){
  vUv = uv;
  vec3 pos = position;
  vec3 npos = position;
  npos.x=npos.x*3.5 + uTime;
  pos.z += snoise3(npos) * 0.05;
  vWave = pos.z;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}