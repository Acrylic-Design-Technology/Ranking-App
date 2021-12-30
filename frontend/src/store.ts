import { writable } from "svelte/store";

export const initStore = () => ({
    "image-1": null,
    "image-2": null,
    selected: null, // image-1 or 2
    selectedReasons: {
        "Detail": false,
        "Stroke techniques": false,
        "Many layers": false
    },
    additionalReasons: null
});

export default writable(initStore());
