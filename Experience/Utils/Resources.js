import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../Experience.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.Experience = new Experience();
        this.renderer = this.Experience.renderer
        this.scene = this.Experience.scene
        this.assets = assets;
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
       
    }

    startLoading() {
        for (const asset of this.assets) {
       
            if(asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                    console.log(file)
                })
            } else if (asset.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                this.videoTexture[asset.name] = new THREE.VideoTexture(this.video[asset.name])

                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipMaps = false;
                this.videoTexture[asset.name].encoding = THREE.SRGBColorSpace;

                this.singleAssetLoaded(asset,  this.videoTexture[asset.name]);

                
            } 
            else if(asset.type === "nebulajpg") {


                this.geometry = new THREE.PlaneGeometry(20, 20);
                this.texture = this.loaders.textureLoader.load(`./images/nebulacombo1.jpg`);
                this.material = new THREE.MeshStandardMaterial({ 
                    map: this.texture, 
                    transparent: true, 
                    opacity: 0.8, 
                    side: THREE.DoubleSide,
                    roughness: 0.7,

                });
                this.plane = new THREE.Mesh(this.geometry, this.material);

                this.singleAssetLoaded(asset, this.plane);
              


            } else if (asset.type === "planettexture") {
                this.texture = this.loaders.textureLoader.load(`./textures/planetTexture.jpg`);

                this.texturedMaterial = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    metalness: 0.1,
                    roughness: 0.2,
                    normalMap: this.texture,
                    emissive: 0x9152cc
                  })

                  this.bigSphereGeometry = new THREE.SphereGeometry(1, 32, 32);
                  this.bigSphere = new THREE.Mesh(this.bigSphereGeometry, this.texturedMaterial);

                  this.singleAssetLoaded(asset, this.bigSphere);
            }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;

        console.log(file)
        if(this.loaded === this.queue) {
          
            this.emit("ready");
        }
    }
}