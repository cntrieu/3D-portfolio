import Experience from "../Experience"
import * as THREE from "three"

import Nebula from "./Nebula"
import Planet from "./Planet"
import Environment from "./Environment"
import Controls from "./Controls"
import Room from "./Room"

import Stars from "./Stars";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;
        

        this.resources.on("ready", () => {
            this.environment = new Environment();
     
            this.planet = new Planet();
            this.nebula = new Nebula();
            this.stars = new Stars();
            this.room = new Room();
            this.controls = new Controls();
            this.emit("worldready");
    
        })

    }

    switchTheme(theme) {
        if(this.environment) {
            this.environment.switchTheme(theme);
        }
    }
    

    resize() {

    }

    update() {
        if(this.nebula) {
            this.nebula.update();
        }

        if(this.planet) {
            this.planet.update();
        }

        if(this.room) {
            this.room.update();
        }

        if(this.controls) {
            this.controls.update();
        }
    }

}