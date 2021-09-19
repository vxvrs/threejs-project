import * as THREE from "three";

const loadingScene = new THREE.Scene();

const loadingObject = new THREE.Mesh(
    new THREE.IcosahedronGeometry(5),
    new THREE.MeshStandardMaterial({ color: 0x0062ff })
);
loadingScene.add(loadingObject);

var loadingGeometry: THREE.TextGeometry;
const fontLoader = new THREE.FontLoader();
fontLoader.load("/examples/fonts/helvetiker_bold.typeface.json", function(font) {
    loadingGeometry = new THREE.TextGeometry("loading ...", {
        font: font,
    });

    const loadingObject = new THREE.Mesh(
        loadingGeometry,
        new THREE.MeshStandardMaterial({ color: 0x0062ff })
    );
    loadingObject.position.set(0, 0, 0);

    loadingScene.add(loadingObject);
});


const loadingLight = new THREE.AmbientLight();
const loadingPoint = new THREE.PointLight();
loadingPoint.position.set(0, 10, 10);

loadingScene.add(loadingLight, loadingPoint);

const loadingCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
loadingCamera.position.setZ(20);

var loading = true;
const loader = new THREE.LoadingManager();
loader.onLoad = function () {
  console.log("Loaded!");
};

export { loading, loader, loadingCamera, loadingScene, loadingObject };