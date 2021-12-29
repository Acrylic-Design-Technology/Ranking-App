<script lang="ts">
  import store from "./store";
  import { fetchRandomImage } from "./api";

  export let onClick: () => void;
  export let slot: "image-1" | "image-2";
  
  const clickHandler = (e) => {
    e.preventDefault();
    onClick();
  };
  const randomNumber = () => Math.round(Math.random() * 6266);

  let loaded;
  let id = randomNumber();
  let fetchImage = fetchRandomImage(id);
  if (slot === 'image-1') {
      $store["image-1"] = id;
  } else {
      $store["image-2"] = id;
  }

  $: anySelected = $store.selected !== null;
  $: selected = $store.selected == slot;
</script>

<img 
  style={
  `filter: ${anySelected ? selected ? '' : 'brightness(0.5)' : ''} grayscale(1); 
  display: ${!loaded ? "none" : "block"}`} on:click={clickHandler}
  src={fetchImage}
  alt=""
  on:load={() => loaded=true}/>
<img
  style={`display: ${loaded ? "none" : "block"}`}
  class="brush-loader"
  alt="Loading"
  src="./brush.png"
/>
<style>
  img {
    max-width: 200px;
    width: 100%;
    cursor: pointer;
  }
  .brush-loader {
    width: 50px;
    margin: auto;
    animation: spin 750ms infinite;
    mix-blend-mode: multiply;
    margin-top: 150px;
  }
    @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
  }

  @media (min-width: 640px) {
    img {
      max-width: 500px;
    }
  }
</style>
