<script setup>
import { nextTick, ref, watch } from 'vue'

const emit = defineEmits(['clickAvatar'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const container = ref(null)

watch(
  () => props.list.length,
  (value) => {
    nextTick(() => {
      container.value.setScrollTop(container.value.$el.scrollHeight)
    })
  }
)
</script>

<template>
  <el-scrollbar class="h-full px-[45px]" ref="container">
    <div v-for="item in list" :key="item.timestamp">
      <div class="flex gap-[15px] mb-[35px]" :class="item.isMe ? 'is-me' : ''">
        <div>
          <el-avatar
            :size="40"
            :src="`/${item.from}.png`"
            class="cursor-pointer"
            @click="emit('clickAvatar', item.from)"
          >
            <img src="/user.png" />
          </el-avatar>
        </div>
        <div>
          <div class="username">{{ item.from }}</div>
          <div class="message">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style lang="postcss" scoped>
.username {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 5px;
}
.message {
  background: white;
  max-width: 30vw;
  padding: 10px;
  border-radius: 0px 7px 7px 7px;
  color: black;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
}

.is-me {
  flex-direction: row-reverse;
  .username {
    display: none;
    text-align: right;
  }
  .message {
    background: #f3b922;
    border-radius: 7px 0px 7px 7px;
  }
}
</style>
