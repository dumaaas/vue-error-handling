// stores/counter.js
import {
    defineStore
} from 'pinia'
import db from "@/plugins/firebase";

export const useErrorStore = defineStore('errorStore', {
    state: () => {
        return {
            errorData: [],
            warnData: [],
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    getters: {
        getErrorData: (state) => {
            return state.errorData;
        },
        getWarnData: (state) => {
            return state.warnData;
        },
    },
    actions: {
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
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },
        fetchWarnData() {
            this.warnData = [];
            db.collection("warnings")
            .orderBy("Message", "desc")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.warnData.push({
                            id: doc.id,
                            message: doc.data().Message,
                            trace: doc.data().Trace,
                        });
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    },
})