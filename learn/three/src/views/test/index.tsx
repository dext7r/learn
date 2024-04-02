import { useState, useEffect, useRef, FC } from 'react';
import useThree from '../../hooks/useThree'
import { forEach } from 'lodash';
import * as THREE from 'three'; // 导入Three.js库

const Testpage: FC = () => {
  const { container, loading, scene, camera, renderer, CSSRenderer, control, mixers, clock, composers, renderMixins, render, loadGLTF, loadAnimate, loadModels } = useThree();
  // 加载灯光
  const loadLights = () => {
  const LIGHT_LIST = [
    [100, 100, 100],
    [-100, 100, 100],
    [100, -100, 100],
    [100, 100, -100],
  ]
  forEach(LIGHT_LIST, ([x, y, z]) => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
    directionalLight.position.set(x, y, z)
    if(scene) scene.current.add(directionalLight)
  })
      }

  const loadTasks = () => {
     const tasks = [loadGLTF('./equipment.glb')];
     loadModels(tasks);
  }

  const loaderScene = () => {
       // 创建立方体(几何材质)
       const geometry = new THREE.BoxGeometry(); // 创建一个立方体的几何体
       const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 创建一个基础材质
       const cube = new THREE.Mesh(geometry, material); // 使用几何体和材质创建网格对象
       scene.current.add(cube); // 将网格对象添加到场景中
   
  }
  const loaderCamera = () => {
      camera.current.position.z = 5; // 设置相机位置
  }
   // 在这里可以使用上面返回的各种变量和方法，例如：
   useEffect(() => {
    renderer.current.setSize(window.innerWidth, window.innerHeight); // 设置渲染器的大小与窗口大小相同
     console.log('%c [ renderer ]-42', 'font-size:13px; background:pink; color:#bf2c9f;', renderer)
    //  不知道为啥出不来。。。 我再学一下react hooks去
 
     loaderCamera()
     loaderScene()
     loadTasks()
     loadLights()
   }, []);
 
  return  <div ref={container} className="w-full h-full" /> 
}

export default Testpage;
