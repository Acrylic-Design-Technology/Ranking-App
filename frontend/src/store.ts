import { writable } from "svelte/store";

// Dev + Prod handling

const getCookie = cname => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const isProd = JSON.parse(getCookie("PROD"));
const dummyFetch = (path: string, args: any) => {
  function row(path, args) {
    this.url = path;
    this.method = args.method;
    this.body = args.body;
  }
  console.table(new row(path, args));
  return Promise.resolve();
};
// @ts-ignore
window.fetch = isProd ? fetch : dummyFetch;

// Store

export const initStore = () => ({
  "image-1": null,
  "image-2": null,
  selected: null, // image-1 or 2
  selectedReasons: {
    Detail: false,
    "Stroke techniques": false,
    "Many layers": false,
  }
});

export default writable(initStore());
