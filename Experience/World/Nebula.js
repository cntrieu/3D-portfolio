import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

export default class Nebula {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.nebulaGroup = this.resources.items.nebula
        this.nebula = this.resources.items.nebula3; 
        for (let i = 1; i <= 4; i++) {
            this.nebula.push(this.resources.items[`nebula${i}`]);
          }
          
          console.log(this.resources.items)
          console.log(this.nebula); // [nebula1, nebula2, nebula3, nebula4]
  
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }


        this.setAnimation();
        this.onMouseMove();
    }
    
    setAnimation() {

     
        const animateNebula = () => {
            this.nebula.forEach(object => {
                if (object instanceof THREE.Mesh) {
                   
                  
                    object.rotation.z -= 0.001; // Update the rotation of each mesh
                    // object.position.z += 0.08;
                    this.scene.add(object);
                 
                }
            });
   
            requestAnimationFrame(animateNebula);
        };

    
    
        animateNebula();
    }

    onMouseMove() {
        // window.addEventListener('mousemove', (e) => {
    
        //     this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
  
        //     // Rotation of room on mouse move
        //     this.lerp.target = this.rotation;
            
        // })
    }

    resize() {

    }

    update() {

        // this.nebula.forEach(object => {
        //     if (object instanceof THREE.Mesh) {
           
        //       object.rotation.y = this.lerp.current;

        //     }
        // });

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        // this.actualRoom.rotation.y = this.lerp.current;


        // this.mixer.update(this.time.delta * 0.0001);
    }

}