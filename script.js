/* ===============================
   🌟 BANANES 3D PRO ANIMÉES
================================*/

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

/* ===============================
   LIGHTS
================================*/

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambient);

/* ===============================
   BANANE MATERIAL
================================*/

const geometry = new THREE.SphereGeometry(0.7, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xffd500,
  roughness: 0.4,
  metalness: 0.2
});

/* ===============================
   PHYSICS ENGINE SIMPLE
================================*/

let bananas = [];

function createBanana() {

  const banana = new THREE.Mesh(geometry, material);

  banana.position.x = (Math.random() - 0.5) * 10;
  banana.position.y = 6 + Math.random() * 5;
  banana.position.z = (Math.random() - 0.5) * 5;

  banana.velocity = {
    x: (Math.random() - 0.5) * 0.1,
    y: -0.02 - Math.random() * 0.05,
    z: (Math.random() - 0.5) * 0.1
  };

  scene.add(banana);
  bananas.push(banana);
}

/* ===============================
   COLLISION + GRAVITY
================================*/

function updatePhysics() {

  bananas.forEach(b => {

    // Gravité
    b.velocity.y -= 0.0005;

    b.position.x += b.velocity.x;
    b.position.y += b.velocity.y;
    b.position.z += b.velocity.z;

    // Collision sol
    if (b.position.y < -3) {
      b.position.y = -3;
      b.velocity.y *= -0.6; // rebond
    }

    // Collision murs
    if (Math.abs(b.position.x) > 6) {
      b.velocity.x *= -1;
    }

    if (Math.abs(b.position.z) > 4) {
      b.velocity.z *= -1;
    }

    // Rotation dynamique
    b.rotation.x += 0.02;
    b.rotation.y += 0.03;

  });
}

/* ===============================
   SPAWN CONTINU
================================*/

setInterval(() => {
  if (bananas.length < 40) {
    createBanana();
  }
}, 500);

/* ===============================
   ANIMATION LOOP
================================*/

function animate() {
  requestAnimationFrame(animate);

  updatePhysics();

  renderer.render(scene, camera);
}

animate();

/* ===============================
   RESPONSIVE
================================*/

window.addEventListener("resize", () => {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

});
