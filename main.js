import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial ({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff, 20);
pointlight.position.set(0,0,0);
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(pointlight, ambientlight);

const lighthelper = new THREE.PointLightHelper(pointlight);
scene.add(lighthelper);

const gridhelper = new THREE.GridHelper(200, 200);
scene.add(gridhelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.001;

    controls.update();

    renderer.render(scene, camera);
}

animate();