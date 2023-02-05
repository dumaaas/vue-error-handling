import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import db from './plugins/firebase';
import {
  createPinia,
  PiniaVuePlugin
} from 'pinia'
Vue.use(PiniaVuePlugin)
import {
  useErrorStore
} from "@/stores/errorStore";

const pinia = createPinia()

Vue.config.productionTip = false

var logErrors = (err, vm, info) => {
  console.log('Loging errors to API...')
  const stackLines = err.stack.split('\n');
  let fileName;
  let lineNumber;

  stackLines.forEach((line) => {
    if (line.includes('at ')) {
      const matches = line.match(/\((.*):(\d+):\d+\)/);
      if (matches) {
        fileName = matches[1];
        lineNumber = matches[2];
      }
    }
  });

  console.log(fileName, 'fileName', lineNumber, 'lineNumber')
  db.collection("errors")
    .add({
      Message: err.message.toString(),
      Name: err.name && err ? err.name.toString() : '',
      Stack: err.stack && err ? err.stack.toString() : '',
      Component: vm.$options.name && vm.$options && vm ? vm.$options.name.toString() : '',
      File: fileName,
      Line: lineNumber,
      Info: info ? info.toString() : '',
    })
    .then(() => {
      console.log("Document successfully written!");
      useErrorStore().fetchErrorData();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// var logWarnings = (msg, trace) => {
//   console.log('Loging warnings to API...')

//   db.collection("warnings")
//     .add({
//       Message: msg.toString(),
//       Trace: trace ? trace.toString() : '',
//     })
//     .then(() => {
//       console.log("Document successfully written!");
//       useErrorStore().fetchErrorData();
//     })
//     .catch((error) => {
//       console.error("Error writing document: ", error);
//     });
// }




Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  console.error(err, vm, info);
  logErrors(err, vm, info);
}

Vue.config.warnHandler = function (msg, vm, trace) {
  console.warn(`Warn: ${msg}\nTrace: ${trace}`);
  // logWarnings(msg, trace);
}

window.onerror = function (msg, url, line, col, error) {
  console.log("TRALALALALAL", msg, url, line, col, error);
};



new Vue({
  vuetify,
  pinia,
  render: h => h(App)
}).$mount('#app')