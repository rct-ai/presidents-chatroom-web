<script setup>
import { reactive, ref, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'
import MessageList from '@/components/MessageList.vue'
import UserInput from '@/components/UserInput.vue'

const { data: wsMessage, send } = useWebSocket(import.meta.env.VITE_WS_URL, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      alert('Failed to connect WebSocket after 3 retries')
    }
  }
})

const status = ref('idle')
const messageList = reactive([
  {
    from: 'Biden',
    timestamp: 1652498235638,
    message: 'How are you'
  },
  {
    isMe: true,
    from: '0x0df234',
    timestamp: 1652498248595,
    message: 'How will you lead in the next phase of the COVID-19 crisis?'
  }
])

const questionPanelStatus = reactive({
  isLoading: false,
  visible: false,
  waitingForStamp: -1
})

const handleUserInput = (message) => {
  const timestamp = Date.now()
  const data = JSON.stringify({
    action: 'send_message',
    content: {
      message,
      user_id: '0x0df234',
      timestamp
    }
  })
  send(data)
  questionPanelStatus.waitingForStamp = timestamp
  questionPanelStatus.isLoading = true
}

const handleQuestionPanelClose = (done) => {
  if (questionPanelStatus.isLoading) return
  done()
}

const hasEqualStamp = (messageList, stamp) => {
  for (let i = messageList.length - 1; i >= 0; i--) {
    if (messageList[i].timestamp === stamp) return true
  }
}

const handleWaitingResponse = () => {
  if (messageList.length && questionPanelStatus.waitingForStamp > 0) {
    // TODO: update messageList
    console.log(messageList)
    if (hasEqualStamp(messageList, questionPanelStatus.waitingForStamp)) {
      questionPanelStatus.visible = false
      questionPanelStatus.isLoading = false
      questionPanelStatus.waitingForStamp = -1
    }
  }
}

const handleWsMessage = (data) => {
  status.value = data.status || 'idle'

  handleWaitingResponse()
}

watch(wsMessage, (value) => {
  let parsed
  try {
    parsed = JSON.parse(value)
  } catch (e) {
    console.error(e)
  }
  console.log(parsed)
  if (parsed) {
    handleWsMessage(parsed)
  }
})
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="border-b">
      <h1 class="text-center text-3xl py-4">Debate by AI Presidents</h1>
    </div>
    <el-row class="h-full">
      <el-col :span="8">
        <!-- vote -->
        <!-- audience -->
      </el-col>
      <el-col :span="16" class="flex flex-col h-full">
        <!-- message -->
        <message-list :list="messageList" />
        <!-- input -->
        <div class="h-24 p-4">
          <el-button
            type="primary"
            class="askbutton"
            @click="questionPanelStatus.visible = true"
            :disabled="status !== 'idle'"
          >
            Ask Question
          </el-button>
          <el-dialog
            v-model="questionPanelStatus.visible"
            destroy-on-close
            :before-close="handleQuestionPanelClose"
          >
            <user-input
              @submit="handleUserInput"
              :disabled="status !== 'idle'"
              :is-loading="questionPanelStatus.isLoading"
            />
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="postcss" scoped>
.askbutton {
  @apply w-full h-full;
  @apply text-2xl;
}
</style>
