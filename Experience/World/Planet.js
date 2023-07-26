import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

export default class Planet {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.planet = this.resources.items.planettexture;
        console.log(this.planet);
       
        // this.scene.add(this.planet);
        this.planet.scale.set(1, 1, 1)
        this.setAnimatePlanet();
    }
    
    setAnimatePlanet () {
        const animatePlanet = () => {
            this.planet.rotation.y += 0.005;

            requestAnimationFrame(animatePlanet);
        }

        animatePlanet();

    }


    resize() {}

    update() {}

}