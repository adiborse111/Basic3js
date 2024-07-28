import './style.css';
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
camera.position.setX(-3);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial ({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff, 20);
pointlight.position.set(0,0,0);
const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientlight);

// const lighthelper = new THREE.PointLightHelper(pointlight);
// scene.add(lighthelper);

// const gridhelper = new THREE.GridHelper(200, 200);
// scene.add(gridhelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addstar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial ({color: 0xFFFFFF});
    const star = new THREE.Mesh(geometry, material);

    const[x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

    star.position.set(x, y, z);
    scene.add(star);
}
for (let i = 0; i < 199; i++){
    addstar();
}


const spacetexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spacetexture;


const moontexture = new THREE.TextureLoader().load('moon.jpg');
const normalmoontexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moontexture,
        normalMap: normalmoontexture,
    })
);
moon.position.z = 30;
moon.position.setX(-10);
scene.add(moon);


function movecamera() { 
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
document.body.onscroll = movecamera;


function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.001;

    //controls.update();

    renderer.render(scene, camera);
}

animate();