import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DOOR_LIST } from "./constants";
import { Door } from "./components/Door";

// ----- 주제: Beyond the door

// Renderer
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#070114");

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.y = 1.5;
camera.position.z = 12;
scene.add(camera);

// Particles
const geometry = new THREE.BufferGeometry();
const count = 1000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < positions.length; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/images/star.png");

const material = new THREE.PointsMaterial({
    size: 0.1,
    map: particleTexture,
    color: new THREE.Color("gold"),
    transparent: true,
    alphaMap: particleTexture,
    depthWrite: false,
    metalness: 5,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Light
const ambientLight = new THREE.AmbientLight("white", 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Door
DOOR_LIST.forEach((modelSrc) => {
    const door = new Door({
        scene,
        modelSrc,
        x: -10,
        z: 0,
        height: 2,
    });
});

// 그리기
const clock = new THREE.Clock();

function draw() {
    const delta = clock.getDelta();

    controls.update();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
}

function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

// 이벤트
window.addEventListener("resize", setSize);

draw();
