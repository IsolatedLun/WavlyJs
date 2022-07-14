<script lang="ts">
    import { targetWave } from "../utils/funcs";
    import { onMount } from "svelte";

    onMount(() => {
        const els = document.querySelectorAll('.wave');

        els.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const target = e.target as HTMLElement;
                target.setAttribute('data-block', 'true')

                targetWave(target);
            })

            el.addEventListener('mouseleave', (e) => {
                const target = e.target as HTMLElement;
                target.setAttribute('data-block', 'false')

                targetWave(target);
            })
        })
    })

    let density = 25;
</script>

<div class="[ wave-container ]">
    {#each {length: density} as _, i}
    <div class="[ wave ]" data-block='false' data-weight='0'></div>
    {/each}
</div>