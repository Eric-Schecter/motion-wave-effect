#pragma glslify:snoise3=require(glsl-noise/simplex/3d)

uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;
varying float vWave;

// #define saturate(x)clamp(x,0.,1.)

void main(){
  // float a=snoise3(vec3(vUv,uTime*.1))*.0032;
  // float b=snoise3(vec3(vUv,uTime*.1+100.))*.0032;
  vec4 color=texture2D(uTexture,vUv+vWave);
  // vec3 c=vec3(saturate(cos(uTime/10.)),saturate(cos(uTime/5.)),saturate(cos(uTime/20.)));
  // color.rgb=step(.9,color.rgb)*c;
  gl_FragColor=color;
}