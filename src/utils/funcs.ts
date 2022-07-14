/**
 * @param waveEl
 * @summary Controls the transform of the wave and it's neighbours.
*/
export function targetWave(waveEl: HTMLElement) {
    function getWaveData(): [number, boolean] {
        const weight =  Number(waveEl.getAttribute('data-weight'));
        const blocked = Boolean(eval(waveEl.getAttribute('data-block')!));

        return [weight, blocked];
    }

    const [weight, blocked] = getWaveData();

    // Blocked => If there is an object colliding.
    // Is the lowest wave, neighbours must be gradually higher.
    if(blocked) {
        waveEl.style.transform = `scaleY(${weight / 10})`;

        targetWaveNeighbours(waveEl);
    }

    else {
        waveEl.style.transform = `scaleY(${(weight + 1) / 10})`;
    }
}

/**
 * @param waveEl
 * @summary Loops through all of the neighbours and executes targetWave on them with a new weight.
*/
export function targetWaveNeighbours(waveEl: HTMLElement) {
    let next = waveEl.nextElementSibling as HTMLElement
    let prev = waveEl.previousElementSibling as HTMLElement

    let [i, j] = [1, 0]
    while(next || prev) {
        if(next) {
            next.setAttribute('data-weight', String(i));
            targetWave(next);

            next = next.nextElementSibling as HTMLElement;
        }

        if(prev) {
            prev.setAttribute('data-weight', String(i));
            targetWave(prev);

            prev = prev.previousElementSibling as HTMLElement;
        }

        if(i !== 9)
            i++;
        j++;
    }
}