import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper"

export default class Stars {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene

        this.resources = this.experience.resources;
        this.time = this.experience.time;

               // Call the addStars method 200 times
        for (let i = 0; i < 10000; i++) {
            this.addStars();
        }

        this.animateStars
    }
    
    addStars() {
        this.geometry = new THREE.SphereGeometry(0.01, 24, 24);
        this.material = new THREE.MeshStandardMaterial({color: 0xffffff});
        this.star = new THREE.Mesh(this.geometry, this.material);
    
        const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );
        
        this.star.position.set(x, y, z);
        // this.scene.add(this.star)

    }

    animateStars() {
        const animate = () => {
            // Update the star positions here
            this.scene.children.forEach(star => {
                star.position.z -= 0.2;
                star.position.x -= 0.2;
                star.position.y -= 0.2;
            });

            // Call the next frame
            requestAnimationFrame(animate);
        };

        // Start the animation loop
        animate();
    }

}