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
      <div v-for="question in item.questions" class="m-2 p-4 bg-slate-100">
        <div class="text-lg break-normal">{{ question }}</div>
        <div class="flex flex-row-reverse pt-4">
          <el-button type="primary" :disabled="disabled" @click="handleSend(question)">
            Send
          </el-button>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Send other question">
      <el-input
        type="textarea"
        :disabled="disabled"
        placeholder="Ask a question"
        v-model="message"
        max-length="200"
      />
      <div class="flex flex-row-reverse pt-4">
        <el-button type="primary" :disabled="disabled || message.length < 1" @click="handleSend(message)">
          Send
        </el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="postcss" scoped>
.username {
  @apply text-sm;
}
.message {
  @apply bg-white;
  @apply px-4 py-2;
  @apply border rounded;
  max-width: 30vw;
}

.is-me {
  flex-direction: row-reverse;
  .username {
    text-align: right;
  }
  .message {
    @apply bg-blue-200;
  }
}
</style>
