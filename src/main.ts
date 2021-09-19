import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loading, loader, loadingCamera, loadingScene, loadingObject } from "./loading";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")!,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(50);

const geometry = new THREE.TorusGeometry(10, 3, 32, 32);
const material = new THREE.MeshToonMaterial({ color: 0xac25e2 });
const object = new THREE.Mesh(geometry, material);

scene.add(object);

const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(5, 20, 25);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(light, ambientLight);

// const loadingControls = new OrbitControls(loadingCamera, renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshToonMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill(1)
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill(1).forEach(addStar);

const spaceTexture = new THREE.TextureLoader(loader).load("src/imgs/space.jpg");
scene.background = spaceTexture;

const gradientTexture = new THREE.TextureLoader(loader).load(
  "src/imgs/gradient.jpg"
);
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: gradientTexture })
);
cube.position.set(10, 20, 10);

const jeanTexture = new THREE.TextureLoader(loader).load("src/imgs/jean.jpg");
const normalJean = new THREE.TextureLoader(loader).load(
  "src/imgs/jean_normal.jpg"
);
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jeanTexture,
    normalMap: normalJean,
  })
);
sphere.position.set(-10, 10, 15);

scene.add(cube, sphere);

document.addEventListener(
  "keyup",
  (event) => {
    let name = event.key;
    let code = event.code;

    if (code === "Space") {
      changePage("index.html");
    } else {
      console.log(`Pressed ${name}`);
    }
  },
  false
);

function animate() {
  if (loading == true) {
    requestAnimationFrame(animate);

    loadingObject.rotation.x += 0.01;
    loadingObject.rotation.y += 0.01;
    loadingObject.rotation.z += 0.01;

    renderer.render(loadingScene, loadingCamera);

    return;
  }

  requestAnimationFrame(animate);

  object.rotation.x += 0.01;
  object.rotation.y += 0.01;
  object.rotation.z += 0.01;

  sphere.rotation.y += 0.002;

  controls.update();

  renderer.render(scene, camera);
}

animate();
