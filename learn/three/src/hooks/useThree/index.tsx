import { isFunction } from 'lodash';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import useLoading from '../useLoading';
import ThreeBase from './core';
import { useRef, useEffect } from 'react';

function useThree() {
  const container = useRef<HTMLElement | null>(null);
  const { loading, openLoading, closeLoading } = useLoading(true, 500);
  const scene = useRef<THREE.Scene | undefined>();
  const camera = useRef<THREE.PerspectiveCamera | undefined>();
  const renderer = useRef<THREE.WebGLRenderer | undefined>();
  const CSSRenderer = useRef<CSS2DRenderer | undefined>();
  const control = useRef<OrbitControls | undefined>();
  const mixers = useRef<THREE.AnimationMixer[]>([]);
  const clock = useRef<THREE.Clock>(new THREE.Clock());
  const composers = useRef<Map<string, any>>(new Map());
  const renderMixins = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    scene.current = ThreeBase.initScene();
    camera.current = ThreeBase.initCamera(el);
    renderer.current = ThreeBase.initRenderer(el);
    CSSRenderer.current = ThreeBase.initCSSRender(el);
    control.current = ThreeBase.initControl(camera.current, CSSRenderer.current.domElement);
  }, []);

  const render = () => {
    const delta = clock.current.getDelta();
    if (renderer.current && scene.current && camera.current) {
      renderer.current.render(scene.current, camera.current);

      const mixerUpdateDelta = clock.current.getDelta();
      mixers.current.forEach((mixer) => mixer.update(mixerUpdateDelta));

      composers.current.forEach((composer) => composer.render(delta));
      renderMixins.current.forEach((mixin) => isFunction(mixin) && mixin());

      if (CSSRenderer.current) {
        CSSRenderer.current.render(scene.current, camera.current);
      }
    }

    TWEEN.update();
    requestAnimationFrame(render);
  };

  const loadModels = async (tasks: Promise<any>[]) => {
    openLoading();
    await Promise.all(tasks);
    closeLoading();
  };

  const loadGLTF = (url: string): Promise<GLTF> => {
    const loader = new GLTFLoader();
    return new Promise<GLTF>((resolve) => {
      loader.load(url, (object: GLTF) => resolve(object));
    });
  };

  const loadAnimate = (
    mesh: THREE.Mesh | THREE.AnimationObjectGroup | THREE.Group,
    animations: THREE.AnimationClip[],
    animationName: string
  ) => {
    const mixer = new THREE.AnimationMixer(mesh);
    const clip = animations.find((clip) => clip.name === animationName);
    if (!clip) return;
    const action = mixer.clipAction(clip);
    action.play();
    mixers.current.push(mixer);
  };

  return {
    container,
    loading,
    scene,
    camera,
    renderer,
    CSSRenderer,
    control,
    mixers,
    clock,
    composers,
    renderMixins,
    render,
    loadGLTF,
    loadAnimate,
    loadModels,
  };
}

export default useThree;
