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
const voted = ref(false)

const avatars = {
  Biden: '/Biden.png',
  Trump: '/Trump.png',
  Obama: '/Obama.png'
}

const handleSelect = (name) => {
  selected.value = name
}

const handleVote = () => {
  emit('vote', selected.value)
  dialogVisible.value = false
  selected.value = ''
  voted.value = true
}
</script>

<template>
  <div
    class="flex flex-col items-center rounded-[8px] overflow-hidden bg-black-body scoreboard"
  >
    <div
      class="bg-black-subtop h-[50px] text-[24px] leading-[50px] text-center font-semibold w-full"
    >
      Scoreboard
    </div>
    <div class="h-full py-4 flex gap-[20px]">
      <div
        v-for="(count, key) in voteCount"
        class="flex flex-col gap-[20px] bg-black-subtop px-[20px] py-[15px] rounded-[7px]"
      >
        <el-avatar
          :size="50"
          :src="avatars[key]"
          class="cursor-pointer"
          @click="emit('clickAvatar', key)"
        >
          <img src="/user.png" />
        </el-avatar>
        <div class="text-center font-medium text-[16px]">{{ key }}</div>
        <div class="score">{{ `${count}`.padStart(3, '0') }}</div>
      </div>
    </div>
    <el-button
      type="primary"
      @click="dialogVisible = true"
      class="votenow"
      :disabled="voted"
      >Vote Now</el-button
    >
    <el-dialog v-model="dialogVisible" destroy-on-close>
      <div class="flex flex-col items-center gap-[35px] px-[50px]">
        <div class="font-semibold text-[24px] leading-[31px] text-white">
          Vote for your favorite president
        </div>
        <div class="h-full flex gap-[30px]">
          <div
            v-for="(count, key) in voteCount"
            class="ticket"
            :class="selected === key ? 'selected' : ''"
            @click.stop="handleSelect(key)"
          >
            <el-avatar :size="50" :src="avatars[key]">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="text-center font-medium text-[16px] text-white">{{ key }}</div>
          </div>
        </div>
        <el-button
          type="primary"
          @click="handleVote"
          :disabled="selected === ''"
          class="vote"
        >
          Vote
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="postcss" scoped>
#app .scoreboard {
  .score {
    font-weight: 600;
    font-size: 20px;
    line-height: 38px;
    text-align: center;
    letter-spacing: 0.1em;
    width: 56px;
    height: 38px;
    background: #172023;
    border: 1px solid #f3b922;
    border-radius: 7px;
  }
  .votenow {
    width: 250px;
    height: 58px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .ticket {
    @apply cursor-pointer flex flex-col gap-[20px] bg-black-subtop border border-black-subtop px-[20px] py-[15px] rounded-[7px];
    transition: all 0.2s ease;
    &:hover {
      @apply bg-black-hover;
    }
    &.selected {
      @apply border-primary;
    }
  }
  .vote {
    width: 348px;
    height: 34px;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
