import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, starGeo;

function init() {
  // Create scene object
  scene = new THREE.Scene();

  // Setup camera with facing upward
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  // Setup renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.BufferGeometry();
  const starVertices = [];

  for (let i = 0; i < 6000; i++) {
    const star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starVertices.push(star.x, star.y, star.z);
  }

  starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  let sprite = new THREE.TextureLoader().load( './models/whitecircle.png' );
    let STARMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite
    });

    const stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

  animate();
}

// Rendering loop
function animate() {
    console.log(starGeo);
   
    // starGeo.attributes.position.forEach(p => {
    //     p.velocity += p.acceleration;
    //     p.y -= p.velocity;
    //     if (p.y <- 200) {
    //         p.y = 200;
    //         p.velocity = 0;
    //     }
    // });
    // starGeo.verticesNeedUpdate = true; 
    // stars.rotation.y += 0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
