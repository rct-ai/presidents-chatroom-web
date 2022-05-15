<script setup>
import { ref } from 'vue'

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
        <div class="score">{{ `${Math.min(count, 999)}`.padStart(3, '0') }}</div>
      </div>
    </div>
    <el-button
      type="primary"
      @click="dialogVisible = true"
      class="votenow"
      :disabled="voted"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 relative -top-0.5"
      >
        <path
          d="M18 13H17.32L15.32 15H17.23L19 17H5L6.78 15H8.83L6.83 13H6L3 16V20C3 21.1 3.89 22 4.99 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V16L18 13ZM19 20H5V19H19V20ZM11.34 15.02C11.73 15.41 12.36 15.41 12.75 15.02L19.11 8.66C19.2027 8.56749 19.2763 8.4576 19.3264 8.33662C19.3766 8.21565 19.4024 8.08597 19.4024 7.955C19.4024 7.82403 19.3766 7.69435 19.3264 7.57338C19.2763 7.4524 19.2027 7.34251 19.11 7.25L14.16 2.3C14.0698 2.2056 13.9615 2.13029 13.8416 2.07853C13.7218 2.02677 13.5927 1.99961 13.4621 1.99868C13.3315 1.99775 13.2021 2.02306 13.0815 2.0731C12.9609 2.12314 12.8516 2.1969 12.76 2.29L6.39 8.66C6.2973 8.75251 6.22375 8.8624 6.17357 8.98338C6.12339 9.10435 6.09756 9.23403 6.09756 9.365C6.09756 9.49597 6.12339 9.62565 6.17357 9.74662C6.22375 9.8676 6.2973 9.97749 6.39 10.07L11.34 15.02ZM13.46 4.41L17 7.95L12.05 12.9L8.51 9.36L13.46 4.41Z"
        />
      </svg>
      Vote Now
    </el-button>
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 relative -top-0.5"
          >
            <path
              d="M18 13H17.32L15.32 15H17.23L19 17H5L6.78 15H8.83L6.83 13H6L3 16V20C3 21.1 3.89 22 4.99 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V16L18 13ZM19 20H5V19H19V20ZM11.34 15.02C11.73 15.41 12.36 15.41 12.75 15.02L19.11 8.66C19.2027 8.56749 19.2763 8.4576 19.3264 8.33662C19.3766 8.21565 19.4024 8.08597 19.4024 7.955C19.4024 7.82403 19.3766 7.69435 19.3264 7.57338C19.2763 7.4524 19.2027 7.34251 19.11 7.25L14.16 2.3C14.0698 2.2056 13.9615 2.13029 13.8416 2.07853C13.7218 2.02677 13.5927 1.99961 13.4621 1.99868C13.3315 1.99775 13.2021 2.02306 13.0815 2.0731C12.9609 2.12314 12.8516 2.1969 12.76 2.29L6.39 8.66C6.2973 8.75251 6.22375 8.8624 6.17357 8.98338C6.12339 9.10435 6.09756 9.23403 6.09756 9.365C6.09756 9.49597 6.12339 9.62565 6.17357 9.74662C6.22375 9.8676 6.2973 9.97749 6.39 10.07L11.34 15.02ZM13.46 4.41L17 7.95L12.05 12.9L8.51 9.36L13.46 4.41Z"
            />
          </svg>
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
    height: 38px;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
