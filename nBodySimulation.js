export default class NBodySimulation {
    constructor(bodies, timeStep, G) {
        this.bodies = bodies;
        this.timeStep = timeStep;
        this.G = G;
    }

    step() {
        // ---- update velocities first ----
        for (const body of this.bodies) {
            body.updateVelocity(this.bodies, this.G, this.timeStep);
        }

        // ---- then update positions ----
        for (const body of this.bodies) {
            body.updatePosition(this.timeStep);
        }
    }
}