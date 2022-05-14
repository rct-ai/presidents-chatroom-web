<script setup>
import { nextTick, ref, watch } from 'vue';

const emit = defineEmits(['clickAvatar'])
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const avatars = {
  Biden: 'https://avatars0.githubusercontent.com/u/17098180?s=460&v=4'
}

const container = ref(null)

watch(() => props.list.length, (value) => {
  nextTick(() => {
    container.value.scrollTop = container.value.scrollHeight
  })
})

</script>

<template>
  <div class="h-full overflow-y-auto bg-slate-100 absolute inset-0 py-8" ref="container">
    <div v-for="item in list" :key="item.timestamp">
      <div class="flex" :class="item.isMe ? 'is-me' : ''">
        <div class="p-4">
          <el-avatar :size="50" :src="avatars[item.from]" class="cursor-pointer" @click="emit('clickAvatar', item.from)">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
        </div>
        <div class="pt-2">
          <div class="username">{{ item.from }}</div>
          <div class="message">{{ item.message }}</div>
        </div>
      </div>
    </div>
  </div>
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
