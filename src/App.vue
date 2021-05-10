<template>
  <div id="app">
    <textarea v-model="input_str"></textarea>
    <button @click="onTranslate(input_str)">Translate</button>
    <div>YouDao: {{ result.youdao }}</div>
    <div>Google: {{ result.google }}</div>
  </div>
</template>

<script>
import {translateYouDao} from "./translator";
import { youdao, baidu, google } from 'translation-jsapi'

export default {
  name: 'app',
  data() {
    return {
      input_str: "",
      result: {
        youdao: "",
        google: "",
        baidu: "",
        reset() {
          this.youdao = "";
          this.google = "";
          this.baidu = "";
        }
      }
    }
  },
  methods: {
    onTranslate(input) {
      this.result.reset();
      translateYouDao(input, (result) => {
        this.result.youdao = result;
      });

      google.translate(input).then(result => {
        console.log(result)
        this.result.google = result.result[0];
      })
    }
  }
}
</script>
