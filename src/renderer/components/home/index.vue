<template>
  <div id="app">
    <textarea v-model="input_str"></textarea>
    <button @click="onTranslate(input_str)">Translate</button>
    <div>YouDao:</div>
    <div>Result:{{ result.youdao }}</div>
    <div>YouDao:{{ result.youdao2 }}</div>
    <div>Google:{{ result.youdao3 }}</div>
    <p></p>
    <div>Google:</div>
    <div>Result:{{ result.google }}</div>
    <div>YouDao:{{ result.google2 }}</div>
    <div>Google:{{ result.google3 }}</div>
  </div>
</template>

<script>
import {translateYouDao} from '../js/translator'
// eslint-disable-next-line no-unused-vars
import { youdao, baidu, google } from 'translation-jsapi'

export default {
  name: 'app',
  data () {
    return {
      input_str: '',
      result: {
        youdao: '',
        youdao2: '',
        youdao3: '',
        google: '',
        google2: '',
        google3: '',
        reset () {
          this.youdao = ''
          this.youdao2 = ''
          this.youdao3 = ''
          this.google = ''
          this.google2 = ''
          this.google3 = ''
        }
      }
    }
  },
  methods: {
    onTranslate (input) {
      this.result.reset()
      translateYouDao(input, (result) => {
        this.result.youdao = result

        translateYouDao(result, (result) => {
          this.result.youdao2 = result
        })

        google.translate(result).then(result => {
          this.result.youdao3 = result.result[0]
        })
      })

      google.translate(input).then(result => {
        result = result.result[0]
        this.result.google = result

        google.translate(result).then(result => {
          this.result.google2 = result.result[0]
        })

        translateYouDao(result, (result) => {
          this.result.google3 = result
        })
      })
    }
  }
}
</script>
