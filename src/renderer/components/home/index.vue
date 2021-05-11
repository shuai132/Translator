<template>
  <div id="app">
    <div>
      <div>
        <textarea class="swing" id="input_str" v-model="input_str"></textarea>
        <label class="swing" for="input_str">INPUT</label>
      </div>
      <button id="translate" @click="onTranslate(input_str)">Translate</button>
    </div>

    <div class="result">
      <label class="result_head">YouDao:</label>
      <div class="result_item">
        <label class="result_item_title">R:</label>
        <span class="result_item_content">{{ result.youdao }}</span>
      </div>
      <div class="result_item">
        <label class="result_item_title">Y:</label>
        <span class="result_item_content">{{ result.youdao2 }}</span>
      </div>
      <div class="result_item">
        <label class="result_item_title">G:</label>
        <span class="result_item_content">{{ result.youdao3 }}</span>
      </div>
    </div>
    <div class="result">
      <label class="result_head">Google:</label>
      <div class="result_item">
        <label class="result_item_title">R:</label>
        <span class="result_item_content">{{ result.google }}</span>
      </div>
      <div class="result_item">
        <label class="result_item_title">Y:</label>
        <span class="result_item_content">{{ result.google2 }}</span>
      </div>
      <div class="result_item">
        <label class="result_item_title">G:</label>
        <span class="result_item_content">{{ result.google3 }}</span>
      </div>
    </div>

    <label id="about">Design for TanXingXing Copyright © 2021, All Rights Reserved.</label>
  </div>
</template>

<script>
import {translateYouDao} from '../js/translator'
// eslint-disable-next-line no-unused-vars
import { youdao, baidu, google } from 'translation-jsapi'
import { Toast } from '../js/utils'

export default {
  name: 'app',
  data () {
    return {
      input_str: '',
      result: {
        youdao: 'Result: 有道翻译的结果',
        youdao2: '用有道翻译Result',
        youdao3: '用Google翻译Result',
        google: 'Result: Google翻译的结果',
        google2: '用有道翻译Result',
        google3: '用Google翻译Result',
        reset () {
          this.youdao = ''
          this.youdao2 = ''
          this.youdao3 = ''
          this.google = ''
          this.google2 = ''
          this.google3 = ''
        }
      },
      state: {
        lastClickTime: 0
      }
    }
  },
  methods: {
    onTranslate (input) {
      const now = Date.now()
      if (now - this.state.lastClickTime < 3000) {
        Toast('点击太快了吧亲~~  ╮(￣▽ ￣)╭ 我竟无言以对~~', 500)
        return
      }
      this.state.lastClickTime = now

      if (input === '') {
        Toast('好像什么都没有输入哦亲~~  >_<|||', 500)
        return
      }
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

      // eslint-disable-next-line no-unreachable
      google.translate(input).then(result => {
        result = result.result[0]
        this.result.google = result

        google.translate(result).then(result => {
          this.result.google2 = result.result[0]
        })

        translateYouDao(result, (result) => {
          this.result.google3 = result
        })
      }).catch((reason) => {
        Toast('Oops! Google翻译禁止了我们访问 °(°ˊДˋ°) °', 3000)
      })
    }
  }
}
</script>

<style src="../style/input.css"/>

<style>
#app{
  padding: 12px 20px;
}
.swing {
  color: white;
  font-weight: bold;
}
#input_str {
  width: 100%;
  padding: 10px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 12pt;
  font-weight: normal;
  resize: vertical;
  color: #3c3c3c;
}

#translate {
  background-color: #4CAF50;
  font-size: 12pt;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.result {
  background-color: #606060;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.result_head {
  font-size: large;
  font-weight: bold;
}
.result_item {
  margin: 11px 10px;
}
.result_item_title {
  display:inline-block;
  width: 20px;
  font-weight: bold;
}
.result_item_content {
}
#about {
  color: grey;
  display: flex;
  justify-content: center;
  font-size: 10px;
  margin-top: 10px;
}
</style>
