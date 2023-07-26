import * as THREE from 'three';
import './style.css';
import GSAP from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// Create an array to store the planes
const planes = [];

// Load textures and create planes
for (let i = 1; i <= 4; i++) {
  const geometry = new THREE.PlaneGeometry(15, 15);
  const texture = textureLoader.load(`./models/nebula${i}.jpg`);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(geometry, material);
  planes.push(plane);
}

// Create a group to hold the planes
const planeGroup = new THREE.Group();

// Add the planes to the group
planes.forEach((plane, index) => {
  plane.position.z = -(index + 1);
  planeGroup.add(plane);
});

// Calculate the total width of the duplicated groups
const repetitionCount = 5; // Number of repetitions
const repetitionOffset = 4; // Distance between repetitions

// Duplicate the group with repetitions
for (let i = 0; i < repetitionCount; i++) {
  const repeatedGroup = planeGroup.clone();
//   repeatedGroup.position.x = i * repetitionOffset;
  repeatedGroup.position.z = i * repetitionOffset;
  console.log(repeatedGroup)
  scene.add(repeatedGroup);

    // Randomize the rotation of each plane in the group
    repeatedGroup.children.forEach(plane => {
        const maxRotation = Math.PI / 8;
        const rotationDirection = Math.random() < 0.5 ? -1 : 1;
        const rotationAmount = rotationDirection * Math.random() * maxRotation; // Random rotation amount
        plane.rotation.x = (Math.random() - 0.5) * maxRotation; // Random rotation around the x-axis
        plane.rotation.y = rotationAmount;
        plane.rotation.z = rotationAmount;
        // plane.rotation.z = Math.random() * Math.PI * 2; // Random rotation around the z-axis
      });
}

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.autoRotate = true;

const mouseLerp = {
  current: 0,
  target: 0,
  ease: 0.1,
}

function animate() {

    // For now, this is rotating the planes. We want to rotate the camera
    scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.z -= 0.003; // Update the rotation of each plane
          // object.position.z += 0.02;
        }

        function onMouseMove() {
          window.addEventListener('mousemove', (e) => {
        
              object.rotation.z = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
        
              // Rotation of room on mouse move
              mouseLerp.target = object.rotation.z * 0.1;
              
          })
        }

        onMouseMove();

        mouseLerp.current = GSAP.utils.interpolate(
          mouseLerp.current,
          mouseLerp.target,
          mouseLerp.ease,
        )

        object.rotation.y = mouseLerp.current;

      });
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

