import { useState, useEffect, useRef,Fc } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // 导入OrbitControls
import * as THREE from 'three'; // 导入Three.js库

const Testpage: Fc = () => {
   // 使用useState钩子来管理Three.js场景
   const [scene, setScene] = useState<THREE.Scene | null>(null);
   const canvasRef = useRef<HTMLCanvasElement>(null);
 
   useEffect(() => {
     // 在useEffect中创建和管理Three.js场景
     const scene = new THREE.Scene(); // 创建一个新的Three.js场景
     setScene(scene); // 将场景存储在state中以便以后引用
 
     // 创建渲染器
     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! }); // 使用canvas元素创建WebGL渲染器
     renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器的大小与窗口大小相同
 
     // 创建透视相机
     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 创建透视相机
     camera.position.z = 5; // 设置相机位置
 
     // 创建立方体(几何材质)
     const geometry = new THREE.BoxGeometry(); // 创建一个立方体的几何体
     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 创建一个基础材质
     const cube = new THREE.Mesh(geometry, material); // 使用几何体和材质创建网格对象
     scene.add(cube); // 将网格对象添加到场景中
 
     // 添加OrbitControls来实现交互控制
     const controls = new OrbitControls(camera, renderer.domElement); // 创建OrbitControls对象
 
     const animate = () => {
       requestAnimationFrame(animate); // 请求下一帧动画
       cube.rotation.x += 0.01; // 旋转立方体
       cube.rotation.y += 0.01; // 旋转立方体
       renderer.render(scene, camera); // 渲染场景
     };
     animate(); // 启动动画循环
 
     // 处理窗口大小变化事件
     const handleResize = () => {
       camera.aspect = window.innerWidth / window.innerHeight; // 更新相机的纵横比
       camera.updateProjectionMatrix(); // 更新相机投影矩阵
       renderer.setSize(window.innerWidth, window.innerHeight); // 更新渲染器大小
     };
     window.addEventListener('resize', handleResize); // 监听窗口大小变化事件
 
     // 返回清理函数，在组件卸载时执行
     return () => {
       window.removeEventListener('resize', handleResize); // 移除窗口大小变化事件监听
     };
   }, []); // 仅在组件加载时执行一次，类似于componentDidMount
 
  return  <canvas ref={canvasRef} className="w-full h-full" /> 
}

export default Testpage;
