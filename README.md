# Three Body Orbits
I was setting up some skeleton code to try to simulate the solar system but quickly realized with the scale of everything, I'd run into a lot of trouble doing so with any accuracy. Despite this, I still had a fun simulation of planets orbiting one another utilizing Newton's Law of Universal Gravitation. I stumbled across this video:

https://www.youtube.com/watch?v=7axImc1sxa0

In it, Sebastian Lague discusses his implementation of one possible stable orbit of three bodies. For most initial conditions of three bodies, the resulting dynamic system is chaotic. Therefore, the only way to predict the motion of these bodies is to estimate them using numerical methods. I found this extremely interesting, and decided I would implement a few visually interesting three body orbits.

## How it works
When going to the webpage, you'll be met with a black screen. From here, you can press the "1", "2", and "3" keys on your keyboard to cycle between the 3 simulations. In addition, you may move around the simulations with WASD and change where you are looking by holding right click and dragging your mouse. 

## Equilateral Triangle (Lagrange) Periodic Solution
The first three body orbit is one where the three bodies orbit one another in an equilateral triangle on a 2D plane. The side length of the triangle must be determined (and in the case of this simulation, to scale for visual purposes) and the mass of each is set to one (This is so that the center of mass can be simplified to just being at the origin of the scene. Otherwise, calculations are harder). Each body must be positioned at one of the vertices of this equilateral triangle and the initial velocities are calculated as being perpendicular to the position vector relative to the center of mass for circular motion. This reads as pretty complicated but you can see the calculations in my `triangleOrbit()` function in main.js.

This solution is distinct from the next two since initial masses aren't forced to be one as they are in many other periodic solutions. It was discovered by Joseph-Louis Lagrange in 1772 and often called the "Lagrange Solution". Though I just called it the equilateral triangle solution right now. 

## Figure-Eight Solution
The second orbit has very specific starting positions and velocities that result in a "Figure-Eight" orbit of three bodies. The orbit was numerically discovered by Cristopher Moore in 1993 using computer simulations. It was mathematically proven in a paper published in 2000 by Alain Chenciner and Richard Montgomery. A lot of the math going into these solutions and proofs goes over my head but from here very specific starting positions and velocities can be plugged into the simulation to create this figure-eight orbit. 

This solution, unlike the Lagrange Solution, requires all masses to be equal as a prerequisite. It also results in an orbit on a 2d plane. So far, both the Lagrange Solution and Figure-Eight Solution exist in 3D space but only result in a 2D orbit. 

## Sling Shot
The third orbit I like to call the sling shot. It resembles a sling shot in how two orbital bodies repeatedly "shoot" the third body outwards and pull it back in. This orbit actually made me recall space missions discussed in class and how the gravitational forces of planets can be used to systematically "slingshot" space crafts further into the solar system.

# Final Thoughts
Overall, this project was very fun for me. It's incredibly interesting to see how these seemingly chaotic forces can create stable and predictable systems when under the right conditions. Most of these systems are too specific to ever encounter in real life, but simulations of these gravitational forces have allowed us to finely tune space missions that would have otherwise been seemingly impossible. 

Even more so, this project allowed me to better understand gravity and its effect on planetary orbit. It only really clicked with me through this project how every complex system that exists in our universe can essentially be boiled down into deterministic mathematical equations, which is insane to me. 