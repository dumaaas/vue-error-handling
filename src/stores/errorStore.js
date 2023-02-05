// stores/counter.js
import {
    defineStore
} from 'pinia'
import db from "@/plugins/firebase";

export const useErrorStore = defineStore('errorStore', {
    state: () => {
        return {
            errorData: []
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        getErrorData: (state) => {
            return state.errorData;
        },
    },
    actions: {
        setErrorData(payload) {
            this.errorData = payload;
        },
        fetchErrorData() {
            this.errorData = [];
            db.collection("errors")
            .orderBy("Name", "desc")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.errorData.push({
                            id: doc.id,
                            component: doc.data().Component,
                            name: doc.data().Name,
                            message: doc.data().Message,
                            line: doc.data().Line,
                            stack: doc.data().Stack.slice(0, 48) + '...',
                            info: doc.data().Info,
                            file: doc.data().File,
                        });
                        console.log(doc.id, " => ", doc.data());
                        console.log('hej mala malenaa')
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    },
})