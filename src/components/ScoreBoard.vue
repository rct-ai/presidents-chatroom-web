<script setup>
import { nextTick, ref, watch } from 'vue'

const emit = defineEmits(['clickAvatar', 'vote'])
const props = defineProps({
  voteCount: {
    type: Object,
    default: () => {}
  }
})

const dialogVisible = ref(false)
const selected = ref('')

const avatars = {
  Biden: 'https://avatars0.githubusercontent.com/u/17098180?s=460&v=4'
}

const handleSelect = (name) => {
  selected.value = name
}

const handleVote = () => {
  emit('vote', selected.value)
  dialogVisible.value = false
  selected.value = ''
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="">Scoreboard</div>
    <div class="h-full py-4 flex gap-4">
      <div v-for="(count, key) in voteCount">
        <el-avatar
          :size="50"
          :src="avatars[key]"
          class="cursor-pointer"
          @click="emit('clickAvatar', key)"
        >
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          />
        </el-avatar>
        <div class="text-center">{{ key }}</div>
        <div class="text-center">{{ count }}</div>
      </div>
    </div>
    <el-button type="primary" @click="dialogVisible = true">Vote Now</el-button>
    <el-dialog v-model="dialogVisible">
      <div class="flex flex-col items-center">
        <div class="h-full py-4 flex gap-4">
          <div
            v-for="(count, key) in voteCount"
            class="cursor-pointer p-4"
            :class="selected === key ? 'bg-slate-400' : ''"
            @click.stop="handleSelect(key)"
          >
            <el-avatar :size="50" :src="avatars[key]">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="text-center">{{ key }}</div>
          </div>
        </div>
        <el-button type="primary" @click="handleVote" :disabled="selected === ''">
        Vote
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="postcss" scoped></style>
