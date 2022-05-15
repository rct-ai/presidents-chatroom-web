<script setup>
import { ref } from 'vue'
import questions from '@/services/contents/questions'

const emit = defineEmits(['submit'])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
const message = ref('')

const handleSend = async (value) => {
  emit('submit', value)
  message.value = ''
}
</script>

<template>
  <el-tabs tab-position="left" v-loading="isLoading">
    <el-tab-pane v-for="item in questions" :label="item.theme" :key="item.theme">
      <div
        v-for="question in item.questions"
        class="mb-[26px] mx-[35px] py-[15px] px-[20px] bg-black-top text-white flex gap-[20px]"
      >
        <div class="text-lg break-normal">{{ question }}</div>
        <div class="flex flex-col-reverse pt-4">
          <el-button
            type="primary"
            :disabled="disabled"
            @click="handleSend(question)"
            class="sendbutton"
          >
            Send
          </el-button>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Send other question">
      <div class="mx-[35px] flex flex-col h-[320px]">
        <el-input
          type="textarea"
          :disabled="disabled"
          placeholder="Ask a question"
          v-model="message"
          :maxlength="200"
          :show-word-limit="true"
          class="textarea"
        />
        <div class="flex flex-row-reverse pt-4">
          <el-button
            type="primary"
            :disabled="disabled || message.length < 1"
            @click="handleSend(message)"
            class="sendbutton"
          >
            Send
          </el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="postcss" scoped>
.sendbutton,
.sendbutton.is-disabled {
  @apply w-[75px] h-[34px] text-[16px] font-bold;
}
.textarea {
  flex: 1;
  :deep(.el-textarea__inner) {
    padding: 15px 20px;
    height: 100%;
    background: #2c3234;
    border-radius: 7px;
    color: white;
    font-size: 16px;
  }
  :deep(.el-input__count) {
    background: transparent;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: white;
    bottom: -32px;
    left: 0;
  }
}
</style>
