<script lang="ts">
    export let onSubmit;
    let adding;
    let value;
    let canAdd = false;
    const MAX_LENGTH = 12;

    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        ).trim();
    }

    const onkeyup = e => {
        canAdd = e.target.value.length < MAX_LENGTH && 3 < e.target.value.length;
        if (canAdd && e.key=="Enter") {
            onAdd();
        }
    }

    const onAdd = () => {
        onSubmit(toTitleCase(value));
        value = "";
        adding = false;
    }

    const sugestions = [
        "color blending",
        "small details",
    ]

  </script>
  
<div>
    {#if adding}
        <input on:keyup={onkeyup} bind:value={value} placeholder={sugestions[Math.floor(Math.random() * (sugestions.length-1))]} />
        <button class="button is-info" disabled={!canAdd} on:click={onAdd}>Add</button>
    {:else}
        <p class="button is-text" on:click={() => adding=true}>+ Add a tag</p>
    {/if}
</div>
  
<style>
    p:hover {
        background-color: rgba(255,255,255,0.9);
        color: black !important;
    }

    p {
        width: 100%;
        padding: 7px 16px;
        cursor: pointer;
        color: white !important;
        text-decoration: none !important;
    }

    input {
        width: 100%;
    }

</style>
  