import React, { useRef, useEffect } from 'react';
import styles from './index.module.scss';
import {
  Mesh, Scene, ShaderMaterial, WebGLRenderer, Clock, Vector2, 
   PlaneBufferGeometry, PerspectiveCamera, TextureLoader,
} from 'three';
import fragment from './shader/fragment.frag';
import vertex from './shader/vertex.vert';

class World {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private timer = 0;
  private renderer: WebGLRenderer;
  private clock = new Clock();
  private pointer = new Vector2();
  private loader = new TextureLoader();
  private material: ShaderMaterial;
  constructor(private container: HTMLDivElement) {
    const { offsetWidth: width, offsetHeight: height } = container;
    this.renderer = new WebGLRenderer();
    this.renderer.setClearColor(0x222222);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.setSize(width, height);
    container.append(this.renderer.domElement);

    this.camera = new PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 2);
    this.camera.lookAt(0, 0, 0);
    this.scene = new Scene();

    const geometry = new PlaneBufferGeometry(1, 1,32,32);
    this.material = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.loader.load('img.jpeg') },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    const mesh = new Mesh(geometry, this.material);
    this.scene.add(mesh);

  }
  public draw = () => {
    const time = this.clock.getElapsedTime();
    this.material.uniforms.uTime.value = time;
    this.renderer.render(this.scene, this.camera);

    this.timer = requestAnimationFrame(this.draw);
  }
  public dispose = () => {
    cancelAnimationFrame(this.timer);
  }
  public move = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { clientWidth, clientHeight } = this.container;
    this.pointer.set(
      clientX / clientWidth - 0.5,
      -clientY / clientHeight + 0.5,
    )
  }
}

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const refWorld = useRef<World>();
  useEffect(() => {
    if (!ref.current) { return }
    const container = ref.current;
    refWorld.current = new World(container);
    refWorld.current.draw();
    return () => refWorld.current?.dispose();
  }, [ref])

  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    refWorld.current?.move(e);
  }

  return <div
    ref={ref}
    className={styles.container}
    onMouseMove={move}
  />
}