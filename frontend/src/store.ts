import { writable } from "svelte/store";
import { Deta } from "deta";
import * as ELo from "./elo"; 

// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs, query, where} "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

interface ImageData {
    labels: string[];
    score: number;
};

const deta = Deta('b06k0zb3_26nQxCq99sodGgV75PmrmXCzW6Z45fKC');
const db = deta.Base('images'); 
const DEFAULT_STARTING_SCORE = 10000;

const getImageFromDb = async (imageId) : Promise<ImageData> => {
    let found = await db.get(imageId);
    if (!found) {
        found = await db.insert({score: DEFAULT_STARTING_SCORE, labels : {}}, imageId)
    }
    // @ts-ignore
    return found;
};

const updateLabels = (data: ImageData, labelsToAssign: string[]) => {
    const prevLabels = data.labels;
    const newLabels = { ...prevLabels };
    labelsToAssign.map(lab => {
        if (prevLabels.includes(lab)) {
            newLabels[lab] = newLabels[lab] + 1;
        } else {
            newLabels[lab] = 1;
        }
    });
    return newLabels;
}

export const update = async (imageAId, imageBId, selectedId, labels: string[]) => {

    // check if in db if not create a doc for each image
    const aData = await getImageFromDb(imageAId);
    const bData = await getImageFromDb(imageBId);

    // Update labels
    let selected: string;
    if (selectedId === imageAId) {
        selected = "A";
        aData.labels = updateLabels(aData, labels);
    } else {
        selected = "B";
        bData.labels = updateLabels(bData, labels);
    };

    const { rA, rB } = ELo.updateRankings(aData.score, bData.score, selected);
    aData.score = rA;
    bData.score = rB;

    await db.putMany([aData, bData])
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBcfaVl3tVKDlE9mNSqnJEdeJ2hNL207PA",
//   authDomain: "key-period-335101.firebaseapp.com",
//   projectId: "key-period-335101",
//   storageBucket: "key-period-335101.appspot.com",
//   messagingSenderId: "953266270752",
//   appId: "1:953266270752:web:4940751eb3c1b0fab7c245",
//   measurementId: "G-DCCS56C9ZT"
// };

// Initialize Firebase
// initializeApp(firebaseConfig);
// const firestore = getFirestore();
// const scoresRef = collection(firestore, "scores");

// const updateScore = async (id: number) => {

//     const q = query(scoresRef, where("image", "==", id));

//     const currentScores = await getDocs(scoresRef);
    // if doc xists
    // currentScores.forEach(doc => {
    //     if (doc.data().id === id) {
    //         query
    //     }
    // })
// }

// export const analytics = getAnalytics();


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