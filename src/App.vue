<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">vue-error-handler</div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <div class="main">
        <div class="error-handler">
          <h2>Make some errors</h2>
          <div class="error-main">
            <v-btn
              color="primary"
              elevation="2"
              x-large
              @click="makeError('1')"
            >
              Error 1
            </v-btn>
            <v-btn
              color="primary"
              elevation="2"
              x-large
              class="ml-2"
              @click="makeError('2')"
            >
              Error 2
            </v-btn>
            <v-btn
              color="primary"
              elevation="2"
              x-large
              class="ml-2"
              @click="makeError('3')"
            >
              Error 3
            </v-btn>
            <v-btn
              color="primary"
              elevation="2"
              x-large
              class="ml-2"
              @click="makeError('4')"
            >
              Error 4
            </v-btn>
          </div>
        </div>
        <div class="error-divider"></div>
        <div class="error-data">
          <h2>Error list</h2>
          <v-data-table
            dense
            :headers="headers"
            :items="errorData"
            item-key="name"
            class="elevation-1"
          ></v-data-table>
          <div class="error-divider" style="margin-top: 25px;"></div>
          <h2 style="margin-top: 15px;">Warn list</h2>
          <v-data-table
            dense
            :headers="headersWarn"
            :items="warnData"
            item-key="name"
            class="elevation-1"
          ></v-data-table>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { useErrorStore } from "@/stores/errorStore";
export default {
  name: "App",

  components: {},

  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Message", value: "message" },
      { text: "Component", value: "component" },
      { text: "Stack", value: "stack" },
      { text: "Line", value: "line" },
      { text: "File", value: "file" },
      { text: "Info", value: "info" },
    ],
    headersWarn: [
      { text: "Message", value: "message" },
      { text: "Trace", value: "trace" },
    ],
  }),

  methods: {
    makeError(type) {
      switch (type) {
        case "1":
          console.log("Refference Error (function): ");
          // eslint-disable-next-line no-undef
          undefinedFunction();
          break;
        case "2":
          // eslint-disable-next-line no-undef
          console.log("Refference Error (var): ", undefinedVar);
          break;
        case "3":
          // eslint-disable-next-line no-undef
          console.log("URI Error: ", decodeURI("%sdfk"));
          break;
        case "4":
          // eslint-disable-next-line no-undef
          var num = 20;
          console.log("Type Error: : ", num.split(""));

          break;
        default:
          // eslint-disable-next-line no-undef
          console.log("undefinedVar: ", undefinedVar);
          break;
      }
    },
  },
  mounted() {
    useErrorStore().fetchErrorData();
    useErrorStore().fetchWarnData();
  },
  computed: {
    errorData() {
      return useErrorStore().getErrorData;
    },
    warnData() {
      return useErrorStore().getWarnData;
    }
  },
};
</script>

<style>
.main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #f6f5f5;
  height: 100%;
}

.error-divider {
  width: 100%;
  height: 1px;
  background: #1976d2;
}

h2 {
  padding-bottom: 15px;
}
</style>
