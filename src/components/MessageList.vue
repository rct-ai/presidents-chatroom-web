<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const avatars = {
  'Biden': 'https://avatars0.githubusercontent.com/u/17098180?s=460&v=4',
}
</script>

<template>
  <div v-for="item in list">
    <div class="flex" :class="item.isMe ? 'is-me' : ''">
      <div class="p-4">
        <el-avatar :size="50" :src="avatars[item.from]">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </el-avatar>
      </div>
      <div class="pt-2">
        <div class="username text-sm">{{ item.from }}</div>
        <div class="message">{{ item.message }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.message {
  @apply bg-white;
  @apply px-4 py-2;
  @apply border rounded;
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
