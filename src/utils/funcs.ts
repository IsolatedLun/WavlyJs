import { OBJECT_MAX_Y, WAVE_CLASS, WAVE_CONTAINER_ID, WAVE_HSL_ARR } from "../consts";

/**
 * @param waveEl
 * @summary Controls the transform of the wave and it's neighbours.
*/
export function targetWave(waveEl: HTMLElement, objWeight=Infinity, affectNeighbours=true) {
    function getWaveData(): [number, boolean] {
        const weight =  Number(waveEl.getAttribute('data-weight'));
        const blocked = Boolean(eval(waveEl.getAttribute('data-block')!));

        return [weight, blocked];
    }

    const [weight, blocked] = getWaveData();
    const waveFillerEl = waveEl.children[0] as HTMLElement;
        

    // Blocked => If there is an object colliding.
    // Is the lowest wave, neighbours must be gradually higher.
    if(blocked) {
        waveFillerEl.style.transform = `scaleY(${weight / 10})`;

        if(affectNeighbours)
            targetWaveNeighbours(waveEl, objWeight);
    }

    else {
        waveFillerEl.style.transform = `scaleY(${(weight + 1) / 10})`;
    }

    waveFillerEl.style.backgroundColor = `hsl(${WAVE_HSL_ARR[0]}, 
        ${WAVE_HSL_ARR[1]}%, ${WAVE_HSL_ARR[2] - weight}%)`;
}

/**
 * @param waveEl
 * @summary Loops through all of the neighbours and executes targetWave on them with a new weight.
*/
export function targetWaveNeighbours(waveEl: HTMLElement, range=Infinity) {
    let next = waveEl.nextElementSibling as HTMLElement;
    let prev = waveEl.previousElementSibling as HTMLElement;

    let [i, r] = [1, range];
    while(r > 0 && (next || prev)) {
        let val = Number((i).toPrecision(2));
        val = clamp(0.25, val, 10);

        if(next) {
            next.setAttribute('data-weight', String(val));
            targetWave(next, range, false);

            next = next.nextElementSibling as HTMLElement;
        }

        if(prev) {
            prev.setAttribute('data-weight', String(val));
            targetWave(prev, range, false);

            prev = prev.previousElementSibling as HTMLElement;
        }

        if(i < 9)
            i++;
        r--;
    }
}

/**
 * @summary Initializes the waves, go figure.
*/
export function initializeWaves() {
    const waves = selectWaves();
    const waveContainer = document.getElementById(WAVE_CONTAINER_ID) as HTMLElement;

    waveContainer.addEventListener('mouseleave', () => {
        waves.forEach(wave => {
            const waveFiller = wave.children[0] as HTMLElement;
            waveFiller.style.transform = 'scaleY(1)';
        })
    })
}
export 

// Math
function clamp(min: number, x: number, max: number): number {
    if(x > max)
        return max;
    if(x < min)
        return min;
    return x;
}

// Short hands
export function def<A, B>(x: A, def: B): A | B {
    return x ? x : def;
}

export function selectWaves() {
    return document.querySelectorAll('.' + WAVE_CLASS) as NodeListOf<HTMLElement>;
}

export function selectObjects() {
    return document.querySelectorAll('*[data-gravity]') as NodeListOf<HTMLElement>;
}