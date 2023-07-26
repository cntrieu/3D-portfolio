import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.pictureFrame = this.resources.items.pictureFrame.scene;

        this.screenOne = this.resources.items.screen.scene;
       
        console.log(this.resources.items.screen)
        console.log(this.pictureFrame)
        console.log(this.actualRoom);
       
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

        this.pictureFrame.children.forEach(child => {
            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if(child.name === "Picture_Frame") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.materialopacity = 3;
            }

            child.scale.set(1, 1, 1);
            child.position.set(0, 0, 0)
        })


        document.querySelector(".tinysquares").addEventListener("click", () => {
            this.changeMap(this.resources.items.arcadeScreen);
          });
      
          document.querySelector(".nomad-nebula").addEventListener("click", () => {
            this.changeMap(this.resources.items.computerScreen);
          });


        this.screenOne.position.z = 3;
        this.screenOne.scale.set(0, 0, 0);
        this.scene.add(this.screenOne);

        this.pictureFrame.position.z = 3;
        this.pictureFrame.scale.set(1, 1, 1)
        this.scene.add(this.pictureFrame);

  
    }

    changeMap(newMap) {
        
        this.screenOne.children.forEach((child) => {
          if (child.name === "MonitorScreen") {
            child.material = new THREE.MeshPhysicalMaterial({
              map: newMap,
              side: THREE.DoubleSide,
            });
            child.material.map.wrapS = THREE.RepeatWrapping;
            child.material.map.wrapT = THREE.RepeatWrapping;
            child.material.map.repeat.y = -1; // Flip the texture vertically
          }
    
          child.scale.set(1, 1, 1);
          child.position.set(0, 0, 0);
        });
    }
    

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.fly = this.mixer.clipAction(this.room.animations[57]);
        this.fly.play();

        this.pictureFrame.rotation.x = -0.1;

        const animatePicture = () => {
            const rotationIncrementX = Math.random() * 0.002; // Adjust the value as needed
            const rotationIncrementY = Math.random() * 0.01; // Adjust the value as needed
            const rotationIncrementZ = Math.random() * 0.002; // Adjust the value as needed
    
            // this.pictureFrame.rotation.x += rotationIncrementX;
            this.pictureFrame.rotation.y += rotationIncrementY;
            // this.pictureFrame.rotation.z += rotationIncrementZ;
            requestAnimationFrame(animatePicture);
        }

        animatePicture();
    }

    onMouseMove() {
        window.addEventListener('mousemove', (e) => {

            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;

            // Rotation of room on mouse move
            this.lerp.target = this.rotation * 0.5;
            
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
        // this.pictureFrame.rotation.y = this.lerp.current * 4;
        this.screenOne.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0001);
    }

}