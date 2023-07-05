import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"


export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if(child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        })
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();



    }
    
    // Scrolling animation for the room
    setScrollTrigger() {

        let mm = GSAP.matchMedia();
        // desktop setup code here...
        mm.add(
            "(min-width: 969px)", () => {

            // Set desktop to the original scale
            this.room.scale.set(0.33, 0.33, 0.33)
            this.rectLight.width = 0.3;
            this.rectLight.height = 1;

            // First section----------------------
            console.log("fired desktop")

            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            });
            this.firstMoveTimeline.to(this.room.position, {
                x: () => {
                    return this.sizes.width * 0.0014;
                }
            });

            // Second section -------------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.room.position, {
                x: () => {
                    return 1;
                },
                z: () => {
                    return this.sizes.height * 0.0032;
                }
            }, "same")

            // Scale into room
            .to(this.room.scale, {
                x: 0.8,
                y: 0.8,
                z: 0.8,
            }, "same")

            // ensure the width and height are same as in rect light in room.js
           .to(this.rectLight, 
            {
                width: 0.3 * 4,
                height: 1 * 4
            }, "same");

                  // Third Section --------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        }).to(this.camera.orthographicCamera.position, {
            y: 1.5,
            x: 0.2,
            z: 0.2,
        });

        }
        
        );



         // MOBILE SETUP
        mm.add("(max-width: 968px)", () => {
            console.log("fired mobile")

            // Resets
            this.room.scale.set(0.25, 0.25, 0.25);
            this.room.position.set(0, 0, 0);
            this.rectLight.width = 0.3
            this.rectLight.height = 1

            // First section----------------------
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        }).to(this.room.scale, {
            x: 0.4,
            y: 0.4,
            z: 0.4
        })
    // Second section -------------------------
        this.secondMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".second-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        }).to(this.room.scale, {
            x: 0.5,
            y: 0.5,
            z: 0.5
        }, "same").to(this.rectLight, {
            width: 0.3 * 3.4,
            height: 1 * 3.4,
        }, "same").to(this.room.position, {
            x: 1.5,
        }, "same")

    // Third Section --------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        }).to(this.room.position, {
            z: -0.5,
        })

       
        

        });

        // PROGRESS BAR
        mm.add(
            "all", () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper")
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                markers: true,
                                scrub: 0.6,
                            }
                        })
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                markers: true,
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                markers: true,
                                scrub: 0.6,
                            }
                        })
                    }

                    // progress bar filling up animation
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                })
            }
        )
       
        // This is to change the scale on a mesh
        // console.log(this.room.children);
        // this.room.children.forEach(child => {
        //     if(child.name === "Desk") {
        //         GSAP.to(child.scale, {
        //             x: 1,
        //             y: 1,
        //             z: 1,
        //             duration: 0.3
        //         })
        //     }
        // })
    }

    resize() {

    }

    update() {
        }

}