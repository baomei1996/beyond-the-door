import { gltfLoader } from "../common";
import { Stuff } from "./Stuff";

export class Door extends Stuff {
    constructor(info) {
        super(info);
        gltfLoader.load(info.modelSrc, (glb) => {
            this.modelMesh = glb.scene.children[0];
            console.log(this.modelMesh);
            this.modelMesh.castShadow = true;
            this.modelMesh.position.set(this.x, this.y, this.z);
            info.scene.add(this.modelMesh);
        });
    }
}
