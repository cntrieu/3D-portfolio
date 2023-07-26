import { EventEmitter } from "events";
import Experience from "./Experience"
import GASP from "gsap";
import convert from "./Utils/convertDivstoSpans"

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })
        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })
    }

    setAssets() {
        // convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))

        // this.room = this.experience.world.room.actualRoom;
        // this.roomChildren = this.experience.world.room.roomChildren;
        // console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise ((resolve) => {
            // Making the room on page load enlarge animation and ease to the left
            this.timeline = new GASP.timeline();
            this.timeline.set(".animatedis", {y: 0, yPercent: 100})
            this.timeline.to("preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden")
                }
            })

            // if(this.device === "desktop") {
            //     this.timeline.to(this.roomChildren.room.scale, {
            //         x: 0.5,
            //         y: 0.5,
            //         z: 0.5,
            //         ease: "back",
            //         duration: 0.7,
            //     }).to(this.room.position, {
            //         x: -1,
            //         ease: "power1.out",
            //         duration: 0.7,
               
            //     })
            // } else {
            //     this.timeline.to(this.roomChildren.room.scale, {
            //         x: 0.5,
            //         y: 0.5,
            //         z: 0.5,
            //         ease: "back",
            //         duration: 0.7,
            //     }).to(this.room.position, {
            //         z: -1,
            //         ease: "power1.out",
            //         duration: 0.7,
                   
            //     })
            // }

            this.timeline
            .to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
                onComplete: resolve,
            }).to(".arrow-svg-wrapper", {
                opacity: 1
            }, "same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "same")
            .to(".hero-main-title .animatedis", {
                yPercent: 0,
                stagger: 0.01,
                ease: "back.out(0.6)",
          
            }).to(".hero-main-description .animatedis", {
                yPercent: 0,
                stagger: 0.01,
                ease: "back.out(0.6)",
             
            }).to(".first-sub .animatedis", {
                yPercent: 0,
                stagger: 0.01,
                ease: "back.out(0.6)",
               
            }).to(".second-sub .animatedis", {
                yPercent: 0,
                stagger: 0.01,
                ease: "back.out(0.6)",
             
            })
        })
    }

    secondIntro() {
        return new Promise ((resolve) => {
            this.secondTimeline = new GASP.timeline();

            this.secondTimeline.to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout")
            // .to(
            //     this.room.position,
            //     {
            //         x: 0,
            //         y: 0,
            //         z: 0,
            //         ease: "power1.out",
            //     },
            //     "same"
            // )
            // .to(
            //     this.roomChildren.room.rotation,
            //     {
            //         y: 2 * Math.PI + Math.PI / 4,
            //     },
            //     "same"
            // )
            // .to(
            //     this.roomChildren.room.scale,
            //     {
            //         x: 3,
            //         y: 3,
            //         z: 3,
            //     },
            //     "same"
            // )
            // .to(
            //     this.camera.orthographicCamera.position,
            //     {
            //         y: 2.5,
            //     },
            //     "same"
            // )
            // .to(
            //     this.roomChildren.room.position,
            //     {
            //         x: 0,
            //         y: 0,
            //         z: 0,
            //     },
            //     "same"
            // )
            // .set(this.roomChildren.body.scale, {
            //     x: 1,
            //     y: 1,
            //     z: 1,
            // })
            // .to(
            //     this.roomChildren.room.scale,
            //     {
            //         x: 1,
            //         y: 1,
            //         z: 1,
            //         duration: 1,
            //     },
            //     "introtext"
            // )

            .to(".arrow-svg-wrapper", {
                opacity: 1,
                onComplete: resolve
            })

            // if(this.device === "desktop") {
            //     this.secondTimeline.to(this.room.position, {
            //         x: 0,
            //         y: 0,
            //         z: 0,
            //         ease: "power1.out",
            //         onComplete: resolve,
            //     })
            // } 
            }
        )}

    onScroll(e) {
        if(e.deltaY > 0) {
            this.removeEventListeners();
            this.secondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0) {
            console.log("swiped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchStart", this.touchStart);
        window.removeEventListener("touchMove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this)
        this.touchStart = this.onTouch.bind(this)
        this.touchMove = this.onTouchMove.bind(this)
        window.addEventListener("wheel",  this.scrollOnceEvent);
        window.addEventListener("touchStart", this.touchStart);
        window.addEventListener("touchMove", this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro()
        this.scaleFlag = false;
        this.emit("enablecontrols")
    }

    move() {
        // if(this.device === "desktop") {
        //     this.room.position.set(-1, 0, 0);
        // } else {
        //     this.room.position.set(0, 0, -1);
        // }
    }

    scale() {
        // this.roomChildren.rectLight.width = 0;
        // this.roomChildren.rectLight.height = 0;

        // if (this.device === "desktop") {
        //     this.room.scale.set(0.11, 0.11, 0.11);
        // } else {
        //     this.room.scale.set(0.07, 0.07, 0.07);
        // }
    }

    update() {
        if(this.moveFlag) {
            this.move
        }

        if (this.scaleFlag) {
            this.scale();
        }
     
    }


}