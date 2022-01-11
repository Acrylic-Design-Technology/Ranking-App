const BUCKET = "https://storage.googleapis.com/painting-dataset/500px/resized/";

export const fetchRandomImage = (id: number) => `${BUCKET}${id}.jpg`;
