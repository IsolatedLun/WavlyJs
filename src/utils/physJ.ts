import { OBJECT_MAX_Y } from "../consts";
import { clamp, def, getTranslateXY, rand, selectObjects, selectWaves, targetWave } from "./funcs";

/**
 * @summary Applies "gravity" or simply increases an object's y pos till it reaches the bottom of the screen.
*/
export function applyGravity() {
    function getObjData(obj: HTMLElement): [number, number, string, boolean] {
        const y = def(Number(obj.getAttribute('data-y')), 0);
        const objMass = def(Number(obj.getAttribute('data-mass')), 1);
        const handler = def(obj.getAttribute('data-handler'), 'object')!;
        const isDead = Boolean(def(eval(obj.getAttribute('data-dead')!), false));

        return [y, objMass, handler, isDead];
    }
    const objs = selectObjects();

    objs.forEach(obj => {
        const [y, objMass, handler, isDead] = getObjData(obj);

        if(isDead)
            return;
        
        // If object is in bounds
        if(y < OBJECT_MAX_Y) {
            // Different object require different handlers like rain.
            switch(handler) {
                case 'object':
                    objectHandler(obj, y);
                    break;
                case 'rain':
                    rainHandler(obj, y);
                    break;
            }


            obj.setAttribute('data-y', String(y + 10 * objMass));
        }
        else {
            switch(handler) {
                case 'rain':
                    obj.remove();
            }
        }
    })

    checkWaveCollisions();
    window.requestAnimationFrame(applyGravity);
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

                if(obj.title !== 'rain')
                    targetWave(waves[i], Number(obj.getAttribute('data-mass')));
                return;
            }
        }
    })
}

// Handlers
function objectHandler(obj: HTMLElement, y: number) {
    obj.style.transform = `translateY(${y}px)`;
}

function rainHandler(rainEl: HTMLElement, y: number, reset=false) {
    const { x } = getTranslateXY(rainEl);

    rainEl.style.transform = `translate(${x}px, ${y}px)`;
}