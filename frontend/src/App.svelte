<script lang="ts">
  import ImageBox from "./ImageBox.svelte";
  import store, { initStore } from "./store";

  let showImages = true;
  const onNext = () => {
    showImages = false;
    setTimeout(() => showImages=true, 50);
    $store = initStore();
  };
  const onSkip = onNext;
  const onSubmit = () => {
    // post results to backend
    const selectedId = $store[$store.selected];
    fetch("api/update?" + "imageAid=" + $store["image-1"] + "&imageBid=" + $store["image-2"] + "&selectedId=" + selectedId, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify([
        ...Object.keys($store.selectedReasons).filter(r => $store.selectedReasons[r]).map(r => r.toLowerCase()),
        ...$store.additionalReasons,
      ])
    })
    console.log(selectedId, $store.selectedReasons, $store.additionalReasons)
    onNext();
  }
  let canSubmit;
  $: $store, (() => canSubmit = $store.selected && (Object.values($store.selectedReasons).find(a => a) || $store.additionalReasons))();
  
</script>

<main>
  <img src="static/logo.png" />
  <h2 class="title is-3">Which painting is harder to paint?</h2>
  <!-- <h3 class="subtitle is-5">Paintings shown in black and white to focus on painting structure</h3> -->
  <div id="box">
    {#if showImages === true}
      <ImageBox slot="image-1" />
      <ImageBox slot="image-2" />
    {/if}
  </div>
  <div id="ctas">
    <button class="button is-dark" id="skip" on:click={onSkip}>Skip</button>
    <button class="button is-info" id="submit" disabled={!canSubmit} on:click={onSubmit}>Submit</button>
  </div>
</main>

<style>
  /* :global(body) { */
    /* background: radial-gradient(
      circle,
      rgba(0, 19, 75, 1) 0%,
      rgba(254, 0, 0, 1) 81%,
      rgba(200, 1, 132, 1) 100% */
    /* ); */
  /* } */

  img {
     margin: 10px 0 10px 0;
  }

  h2, h3 {
    color: white !important;
  }

  #box {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  #ctas button {
    padding: 10px;
  }

  #skip {
    margin-right: 10px;
  }

  main {
    text-align: center;
    max-width: 240px;
    padding-top: 50px;
    color: white;
    margin: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: 1200px;
    }
    #box {
      flex-direction: row;
    }
  }
</style>
