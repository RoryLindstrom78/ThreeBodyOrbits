import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js";

export default class CelestialBody {
    constructor(mesh, mass, radius, initialVelocity) {
        this.mesh = mesh;
        this.mass = mass;
        this.radius = radius;
        this.velocity = initialVelocity.clone();
    }

    updateVelocity(allBodies, G, timeStep) {
        const acceleration = new THREE.Vector3(0,0,0);
        for (const other of allBodies) {
            if (other === this) continue;
            const direction = new THREE.Vector3().subVectors(other.mesh.position, this.mesh.position);
            const sqrDist = direction.lengthSq();
            direction.normalize();
            const forceMagnitude = (G * this.mass * other.mass) / sqrDist;
            const force = direction.multiplyScalar(forceMagnitude);
            acceleration.add(force.divideScalar(this.mass));
        }

        // semi-implicit Euler
        this.velocity.addScaledVector(acceleration, timeStep);
    }

    updatePosition(timeStep) {
        this.mesh.position.addScaledVector(this.velocity, timeStep);
    }
}
