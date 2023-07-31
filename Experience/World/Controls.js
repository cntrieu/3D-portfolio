import Experience from "../Experience"
import * as THREE from "three"
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ASScroll from '@ashthornton/asscroll'


export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.nebula = this.experience.world.nebula.scene;
        this.pictureFrame = this.experience.world.room.pictureFrame;

        console.log(this.sizes);
        
        this.screenOne = this.experience.world.room.screenOne;
        console.log(this.screenOne);
     
        const playBtns = document.querySelectorAll('.play-btn');
        playBtns.forEach((btn) => {
                if (this.sizes.device === "mobile") {
                    btn.classList.add("hidden")
                }
        });
        
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";


        this.setSmoothScroll();
        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
          disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }


    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }


    
    // Scrolling animation for the room
    setScrollTrigger() {

        let mm = GSAP.matchMedia();
        // desktop setup code here...
        mm.add(
            "(min-width: 969px)", () => {

            // Set desktop to the original scale

            // First section----------------------
         

            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom top",
                    scrub: 2,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.pictureFrame.position, {
                // duration: 10,
                x: () => {
                    return this.sizes.width * 0.0014;
                },
                y: () => {
                    return -0.5
                }
            }, "same")

            // Second section -------------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    start: "top top",
                    end: "top top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.screenOne.position, {
                x: () => {
                    return this.sizes.width * -0.0014;
                },
            })
            .to(this.screenOne.scale, {
                x: 2,
                y: 2,
                z: 2,
                duration: 5,
            })

            this.secondMoveTimelinePicture = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-section-detail-wrapper",
                    start: "top top",
                    end: "top top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.pictureFrame.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 5,
            })


                  // Third Section --------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".second-section-detail-wrapper",
                start: "center+=20%",
                // end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        })
        .to(this.screenOne.scale, {
            duration: 10,
            x: 0,
            y: 0,
            z: 0
        }, "same")

        }
        
        );



         // MOBILE SETUP
        mm.add("(max-width: 968px)", () => {
            console.log("fired mobile")

            // First section----------------------
          this.firstMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".first-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
        })
        .to(this.pictureFrame.scale, {
            x: 0,
            y: 0,
            z: 0,
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
        })


    // Third Section --------------------------
        this.thirdMoveTimeline = new GSAP.timeline({
            scrollTrigger: {
                trigger: ".third-move",
                start: "top top",
                end: "bottom bottom",
                scrub: 0.6,
                invalidateOnRefresh: true,
            }
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
                              
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                            
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
                         
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                          
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

    }

    resize() {

    }

    update() {
        }

}