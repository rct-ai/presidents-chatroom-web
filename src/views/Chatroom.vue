<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'
import MessageList from '@/components/MessageList.vue'
import UserInput from '@/components/UserInput.vue'
import { ElMessage } from 'element-plus'
import { getUserId } from '@/utils/utils'

const userId = getUserId()
// 约定一个通道发送，一个通道接收
const messageWs = `${import.meta.env.VITE_WS_URL}/${userId}/message`
const sendWs = `${import.meta.env.VITE_WS_URL}/send`

const { status: messageWsStatus, data: wsMessage } = useWebSocket(messageWs, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      ElMessage.error('Failed to connect WebSocket, please reload the page.')
    }
  }
})
const { status: sendWsStatus, send } = useWebSocket(sendWs, {
  autoReconnect: {
    retries: 3,
    delay: 1000,
    onFailed() {
      ElMessage.error('Failed to connect WebSocket, please reload the page.')
    }
  }
})

const wsConnected = computed(
  () => messageWsStatus.value === 'OPEN' && sendWsStatus.value === 'OPEN'
)

const status = ref('idle')
const messageList = ref([])

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
      user_id: userId,
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
  if (messageList.value.length && questionPanelStatus.waitingForStamp > 0) {
    if (hasEqualStamp(messageList.value, questionPanelStatus.waitingForStamp)) {
      questionPanelStatus.visible = false
      questionPanelStatus.isLoading = false
      questionPanelStatus.waitingForStamp = -1
    }
  }
}

const handleWsMessage = (data) => {
  status.value = data.status || 'idle'
  if (data.message_list) {
    messageList.value = data.message_list.map((item) => {
      item.isMe = item.from === userId
      return item
    })
  }
  // TODO: update messageList
  handleWaitingResponse()
}

const handleClickAvatar = (name) => {
  console.log(name)
}

watch(wsConnected, (value) => {
  if (value) {
    ElMessage.success('Connected to WebSocket.')
    send(JSON.stringify({ action: 'refresh' }))
  }
})

watch(wsMessage, (value) => {
  let parsed
  try {
    parsed = JSON.parse(value)
  } catch (e) {
    console.error(e)
  }
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
        <div class="h-full relative">
          <message-list :list="messageList" @click-avatar="handleClickAvatar" />
        </div>
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
