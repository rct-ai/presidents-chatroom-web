<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'
import MessageList from '@/components/MessageList.vue'
import UserInput from '@/components/UserInput.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
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
const voteCount = ref({})
const messageList = ref([])
const audienceList = ref([])

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

const handleVote = (name) => {
  console.log(name)
  send(
    JSON.stringify({
      action: 'vote',
      content: {
        name
      }
    })
  )
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

const handleFirstInvite = () => {
  if (!audienceList.value.some((user_id) => user_id === userId)) {
    send(
      JSON.stringify({
        action: 'audience_enter',
        content: {
          user_id: userId
        }
      })
    )
  }
}

const handleWsMessage = (data) => {
  status.value = data.status || 'idle'
  voteCount.value = data.vote_count || {}
  data.audience_list?.reverse()
  audienceList.value = data.audience_list || []
  if (data.message_list) {
    messageList.value = data.message_list.map((item) => {
      item.isMe = item.from === userId
      return item
    })
  }

  // TODO: update messageList
  handleWaitingResponse()
  handleFirstInvite()
}

const handleClickAvatar = (name) => {
  console.log(name)
}

watch(wsConnected, (value) => {
  if (value) {
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
  <div class="flex flex-col h-screen">
    <div class="header">
      <h1 class="title">Debate by AI Presidents</h1>
    </div>
    <div class="w-[1216px] mx-auto flex-1 h-full flex justify-between pt-[30px]">
      <div class="w-[358px] h-full flex flex-col gap-[50px] pb-[38px]">
        <!-- vote -->
        <score-board :vote-count="voteCount" @vote="handleVote" />
        <!-- audience -->
        <div
          class="flex flex-col items-center rounded-[8px] overflow-hidden bg-black-body flex-1"
        >
          <div
            class="bg-black-subtop h-[50px] text-[24px] leading-[50px] text-center font-semibold w-full"
          >
            Audience
          </div>
          <div class="text-center flex-1 w-full relative">
            <div class="absolute inset-0 py-[20px] text-[13px]">
              <el-scrollbar>
                <div v-for="user in audienceList" class="mb-[10px]">
                  User <span class="text-primary">{{ user }}</span> entered this room
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[810px] flex flex-col h-full">
        <p class="text-center pb-[12px] text-[12px]">
          Only supports English conversation
        </p>
        <!-- message -->
        <div class="relative flex-1 rounded-[7px] bg-black-body border border-primary">
          <div class="absolute inset-0 py-[30px]">
            <message-list :list="messageList" @click-avatar="handleClickAvatar" />
          </div>
        </div>
        <!-- input -->
        <div class="h-[38px] mt-[12px] mb-[38px]">
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
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.header {
  height: 90px;
  background: #2f393d;
  box-shadow: 0px 4px 0px #f3b922;
  @apply flex items-center justify-center;
}
.title {
  font-weight: bold;
  font-size: 40px;
  line-height: 51px;
  text-transform: uppercase;
  color: #f3b922;
}
.askbutton {
  @apply w-full h-full;
  font-size: 16px;
}
</style>
