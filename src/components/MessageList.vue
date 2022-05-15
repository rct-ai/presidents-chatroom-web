<script setup>
import { nextTick, ref, watch } from 'vue'

const avatars = {
  Biden: '/Biden.png',
  Trump: '/Trump.png',
  Obama: '/Obama.png'
}

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
      container.value.setScrollTop(
        container.value.$el.querySelector('.el-scrollbar__view').clientHeight
      )
    })
  }
)

const beforeEnter = (el) => {
  el.style.opacity = 0
}
const enter = (el, done) => {
  // console.log(el.dataset.index)
  setTimeout(() => {
    el.style.transition = 'all 0.3s '
    el.style.opacity = 1
    done()
  }, 100)
}
</script>

<template>
  <el-scrollbar class="h-full px-[45px]" ref="container">
    <transition-group
      name="more"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
    >
      <div
        v-for="item in list"
        :key="item.timestamp"
        :class="!avatars[item.from] ? 'is-user' : ''"
      >
        <div class="flex gap-[15px] pb-[35px]" :class="item.isMe ? 'is-me' : ''">
          <div>
            <el-avatar
              :size="40"
              :src="avatars[item.from]"
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
    </transition-group>
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
  max-width: 380px;
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

.is-user .message {
  background: #f3b922;
}
</style>
