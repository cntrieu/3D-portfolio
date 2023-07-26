import * as THREE from 'three';
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvas = document.querySelector('.webgl')

let scene, camera, renderer, ambient, directionalLight, cloudParticles = [], flash, rainCount = 15000;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    directionalLight = new THREE.DirectionalLight(0xffeedd);
    scene.add(directionalLight);

    // Blue light
    flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    
    let loader = new THREE.TextureLoader();
    loader.load("./models/nebulaplanet.jpg", function(texture) {
        let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        let cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true,
        })

        for (let p = 0; p < 25; p++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 450
            );


            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random()* 360;
            cloud.rotation.opacity = 0.6;
            cloudParticles.push(cloud);
           scene.add(cloud);
        }
        animate()
    })
}

function animate () {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
    })

    // Randomizing the blue effect
    if(Math.random() > 0.93 || flash.power > 100) {
        if(flash.power < 100)
        flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
        )
        flash.power = 50 + Math.random() * 500;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
