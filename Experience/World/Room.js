import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene
        
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }
    
    setModel() {
        this.actualRoom.rotation.y = Math.PI;
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name === "Hologram") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.materialopacity = 3;
            }

            if(child.name === "ArcadeScreen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.arcadeScreen,
                    side: THREE.DoubleSide,
                })

                 // Flip the texture vertically
                child.material.map.wrapS = THREE.RepeatWrapping;
                child.material.map.wrapT = THREE.RepeatWrapping;
                child.material.map.repeat.y = -1; // Flip the texture vertically

            }

            if(child.name === "MonitorScreen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.computerScreen,
                    side: THREE.DoubleSide,
                })
            }

            // if(child.name === "Desk") {
            //     child.scale.set(0, 0, 0)
            // }
        })


        // Rect light on the hologram
        const width = 0.3;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( -0.04, 3,  0.11029338836669922 );
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = -Math.PI / 4;
  
        this.actualRoom.add( rectLight )

        // const rectLightHelper = new RectAreaLightHelper( rectLight );
        // rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.33, 0.33, 0.33);
    }

    

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.fly = this.mixer.clipAction(this.room.animations[57]);
        this.fly.play();
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {

            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

            // Rotation of room on mouse move
            this.lerp.target = this.rotation * 0.1;
            
        })
    }

    resize() {

    }

    update() {

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;


        this.mixer.update(this.time.delta * 0.0001);
    }

}