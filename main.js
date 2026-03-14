import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";
import CelestialBody from "./celestialBody.js";
import NBodySimulation from "./nBodySimulation.js";

let simulation = null;


function clearSimulation() {
    if (!simulation) return; // nothing to clear yet
    for (const body of simulation.bodies) {
        scene.remove(body.mesh); // remove from scene
    }
    simulation = null;
}

// Scene Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.PointLight(0xffffff, 2);
light.position.set(0, 50, 0);
scene.add(light);

// Camera Controls
const keys = { w: false, a: false, s: false, d: false, q: false, e: false, num1: false};
let pitch = 0;
let yaw = 0;
const moveSpeed = 0.5;
const lookSpeed = 0.002;

let isRightMouseDown = false;

let sim1 = false;
let sim2 = false;
let sim3 = false;


// Key events
document.addEventListener("keydown", e => { if(keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase()] = true; });
document.addEventListener("keyup", e => { if(keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase()] = false; });
document.addEventListener("keydown", e => {
    if(e.key === "1") {
        console.log("HELLO");
        clearSimulation();
        triangleOrbit();
        sim1 = true;  
        sim2 = false; 
        sim3 = false;
    }
});
document.addEventListener("keydown", e => {
    if(e.key === "2") {
        console.log("HELLO");
        clearSimulation();
        figureEightOrbit();
        sim2 = true;   
        sim1 = false;
        sim3 = false;
    }
});
document.addEventListener("keydown", e => {
    if(e.key === "3") {
        console.log("HELLO");
        clearSimulation();
        slingShotOrbitOrbit();
        sim3 = true;   
        sim1 = false;
        sim2 = false;
    }
});

// Right mouse button events
document.addEventListener("mousedown", e => { if(e.button === 2) isRightMouseDown = true; });
document.addEventListener("mouseup", e => { if(e.button === 2) isRightMouseDown = false; });

// Mouse movement for rotation
document.addEventListener("mousemove", e => {
    if (!isRightMouseDown) return;
    yaw -= e.movementX * lookSpeed;
    pitch -= e.movementY * lookSpeed;
    pitch = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitch));
});

function triangleOrbit() {
    const L = 20; // side length of triangle
    const G = 50; // gravitational constant
    const m = 1;  // mass of each body

    const centroid = new THREE.Vector3(0,0,0);

    // Positions in equilateral triangle
    const body1Pos = new THREE.Vector3(-L/2, -Math.sqrt(3)/6*L, 0);
    const body2Pos = new THREE.Vector3(L/2, -Math.sqrt(3)/6*L, 0);
    const body3Pos = new THREE.Vector3(0, Math.sqrt(3)/3*L, 0);

    // Velocity magnitude for stable orbit
    const vMag = Math.sqrt(G * m / L);

    // Helper to get tangent velocity
    function getTangentVelocity(pos, centroid, vMag) {
        const radiusVec = new THREE.Vector3().subVectors(pos, centroid);
        const tangent = new THREE.Vector3(-radiusVec.y, radiusVec.x, 0).normalize(); // 90 degrees CCW rotation
        return tangent.multiplyScalar(vMag);
    }

    const bodies = [];

    // BODY 1
    const body1Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );
    body1Mesh.position.copy(body1Pos);
    scene.add(body1Mesh);
    const body1 = new CelestialBody(body1Mesh, m, 1, getTangentVelocity(body1Pos, centroid, vMag));
    bodies.push(body1);

    // BODY 2
    const body2Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    body2Mesh.position.copy(body2Pos);
    scene.add(body2Mesh);
    const body2 = new CelestialBody(body2Mesh, m, 1, getTangentVelocity(body2Pos, centroid, vMag));
    bodies.push(body2);

    // BODY 3
    const body3Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    body3Mesh.position.copy(body3Pos);
    scene.add(body3Mesh);
    const body3 = new CelestialBody(body3Mesh, m, 1, getTangentVelocity(body3Pos, centroid, vMag));
    bodies.push(body3);

    const dt = 0.05;
    simulation = new NBodySimulation(bodies, dt, G);
}

function figureEightOrbit() {
    const scale = 10; // scale positions for visibility
    const G = 1;      // gravitational constant
    const m = 10;      // mass of each body

    // Positions (original figure-eight solution, scaled)
    const p1 = new THREE.Vector3(0.97000436, -0.24308753, 0).multiplyScalar(scale);
    const p2 = new THREE.Vector3(-0.97000436, 0.24308753, 0).multiplyScalar(scale);
    const p3 = new THREE.Vector3(0, 0, 0).multiplyScalar(scale);

    // Velocities
    const v1 = new THREE.Vector3(0.466203685, 0.432365730, 0);
    const v2 = new THREE.Vector3(0.466203685, 0.432365730, 0);
    const v3 = new THREE.Vector3(-0.93240737, -0.86473146, 0);

    const bodies = [];

    // Body 1
    const body1Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );
    body1Mesh.position.copy(p1);
    scene.add(body1Mesh);
    const body1 = new CelestialBody(body1Mesh, m, 1, v1);
    bodies.push(body1);

    // Body 2
    const body2Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    body2Mesh.position.copy(p2);
    scene.add(body2Mesh);
    const body2 = new CelestialBody(body2Mesh, m, 1, v2);
    bodies.push(body2);

    // Body 3
    const body3Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    body3Mesh.position.copy(p3);
    scene.add(body3Mesh);
    const body3 = new CelestialBody(body3Mesh, m, 1, v3);
    bodies.push(body3);

    const dt = 0.05;
    simulation = new NBodySimulation(bodies, dt, G);
}

function slingShotOrbit() {
    const scale = 10; // scale positions for visibility
    const G = 1;      // gravitational constant
    const m = 10;      // mass of each body

    // Positions
    const p1 = new THREE.Vector3(1, 0, 1).multiplyScalar(scale);
    const p2 = new THREE.Vector3(-1, 0, 1).multiplyScalar(scale);
    const p3 = new THREE.Vector3(0, 0, -1).multiplyScalar(scale);

    // Velocities
    const v1 = new THREE.Vector3(0, 0.5, 0);
    const v2 = new THREE.Vector3(0, -0.5, 0);
    const v3 = new THREE.Vector3(0, 0, 0);

    const bodies = [];

    // Body 1
    const body1Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffcc00 })
    );
    body1Mesh.position.copy(p1);
    scene.add(body1Mesh);
    const body1 = new CelestialBody(body1Mesh, m, 1, v1);
    bodies.push(body1);

    // Body 2
    const body2Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
    );
    body2Mesh.position.copy(p2);
    scene.add(body2Mesh);
    const body2 = new CelestialBody(body2Mesh, m, 1, v2);
    bodies.push(body2);

    // Body 3
    const body3Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    body3Mesh.position.copy(p3);
    scene.add(body3Mesh);
    const body3 = new CelestialBody(body3Mesh, m, 1, v3);
    bodies.push(body3);

    const dt = 0.1;
    simulation = new NBodySimulation(bodies, dt, G);
}




// Animation loop 
function animate() {
    requestAnimationFrame(animate);
    if (simulation != null) {
            
        // Step simulation
        simulation.step();

        // Update camera rotation
        camera.rotation.set(pitch, yaw, 0, "YXZ");

        // Update camera movement
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        const right = new THREE.Vector3().crossVectors(camera.up, direction).normalize();

        if (keys.w) camera.position.addScaledVector(direction, moveSpeed);
        if (keys.s) camera.position.addScaledVector(direction, -moveSpeed);
        if (keys.a) camera.position.addScaledVector(right, moveSpeed);
        if (keys.d) camera.position.addScaledVector(right, -moveSpeed);
        if (keys.q) camera.position.y -= moveSpeed;
        if (keys.e) camera.position.y += moveSpeed;

        renderer.render(scene, camera);
    }

}

animate();

// Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Prevent context menu on right-click
window.addEventListener("contextmenu", e => e.preventDefault());