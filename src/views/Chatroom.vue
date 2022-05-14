<script setup>
import { reactive } from 'vue'
import MessageList from '@/components/MessageList.vue'

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
</script>

<template>
  <el-row>
    <el-col :span="8">
      <!-- vote -->
      <!-- audience -->
    </el-col>
    <el-col :span="16">
      <!-- message -->
      <message-list :list="messageList" />
      <!-- input -->
    </el-col>
  </el-row>
</template>
