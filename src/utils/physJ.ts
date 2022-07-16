import { OBJECT_MAX_Y } from "../consts";
import { def, selectObjects, selectWaves, targetWave } from "./funcs";

/**
 * @summary Applies "gravity" or simply increases an object's y pos till it reaches the bottom of the screen.
*/
export function applyGravity() {
    const objs = selectObjects();

    objs.forEach(obj => {
        const y = def(Number(obj.getAttribute('data-y')), 0);
        const objMass = def(Number(obj.getAttribute('data-mass')), 1);
        
        // If object is in bounds
        if(y < OBJECT_MAX_Y) {
            obj.style.transform = `translateY(${y}px)`;
            obj.setAttribute('data-y', String(y + 10 * objMass));
        }
    })

    checkWaveCollisions();
}

// !!!!!!!!! Optimization: Add chunk masks
export function checkWaveCollisions() {
    const objs = selectObjects();
    
    objs.forEach(obj => {
        const waves = selectWaves();

        for(let i = 0; i < waves.length; i++) {
            const objY = obj.getBoundingClientRect().bottom;
            const waveY = waves[i].getBoundingClientRect().top;

            // If the bottom of the object touches the top of the wave
            if(objY > waveY) {
                waves[i].setAttribute('data-block', 'true');
                waves[i].setAttribute('data-affector', obj.title);

                return targetWave(waves[i], Number(obj.getAttribute('data-mass')!));;
            }
        }
    })
}