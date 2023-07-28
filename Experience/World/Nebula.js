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

        this.nebula = this.resources.items.nebulacombo; 


        this.setAnimation();
        this.onMouseMove();
    }
    
    setAnimation() {

     
        const animateNebula = () => {
         
            this.nebula.rotation.z -= 0.0001;
            this.scene.add(this.nebula)

            
   
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


    }

}