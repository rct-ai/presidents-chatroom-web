<script setup>
const avatars = {
  Biden: '/Biden.png',
  Trump: '/Trump.png',
  Obama: '/Obama.png'
}

const props = defineProps({
  name: {
    type: String,
    default: 'Biden'
  }
})
</script>

<template>
  <div class="flex gap-[35px] justify-center">
    <el-avatar
      :size="100"
      :src="avatars[name]"
      class="cursor-pointer"
      @click="emit('clickAvatar', name)"
    >
      <img src="/user.png" />
    </el-avatar>
    <el-scrollbar
      class="article w-[420px] pr-[20px]"
      height="330px"
      v-if="name === 'Biden'"
    >
      <h3>Joseph Robinette Biden</h3>
      <p>
        Joseph Robinette Biden (born 1942), 46th president of the United States (2021–)
      </p>
      <p>
        Born in 1942, Biden is an American politician who has worked as a lawyer and
        served as a member of the Democratic Party as the 47th vice president under Barack
        Obama. He defeated Donald Trump in the 2020 election and was inaugurated as the
        46th president of the United States.
      </p>
      <p>
        Biden has a strong charisma and, unlike Trump, is a veteran politician with
        generally moderate policies. He respects women's rights, blacks and minorities,
        and promotes universal values of diversity.
      </p>
      <p>
        Biden is experienced in domestic and foreign affairs. He is an expert in foreign
        policy, foreign policy and international security affairs, and is concerned about
        human rights, racial discrimination, poverty reduction, disarmament and other
        issues around the world.
      </p>
      <p>
        But known as "America's oldest president," he is also often satirized by the media
        as "old, senile, amnesiac, inarticulate and stuttering ....."
      </p>
    </el-scrollbar>
    <el-scrollbar
      class="article w-[420px] pr-[20px]"
      height="330px"
      v-if="name === 'Trump'"
    >
      <h3>Donald Trump</h3>
      <p>Donald Trump (born 1946), 45th president of the United States (2017–2021)</p>
      <p>
        Donald Trump is a German-American politician of Republican origin. Before entering
        politics, he was an entrepreneur, real estate businessman and television
        personality . He announced his candidacy for the U.S. presidency as a U.S.
        Republican in June 2015. He defeated Hillary in the 2016 election and was sworn in
        as the 45th president of the United States on Jan. 20, 2017.
      </p>
      <p>
        During Trump's administration, the Trump administration has made great progress in
        tax cuts, tough trade policies, increased diplomatic and military layouts, and
        financial deregulation through legislation, executive orders, and personnel
        appointments, among which tax reform is the biggest highlight of his early
        achievements.
      </p>
      <p>
        Trump is the first president to propose "America First". The goal is to maximize
        the use of U.S. domestic voluntary, get rid of the dependence on imports, while
        increasing domestic jobs and promoting the development of the domestic real
        economy.
      </p>
      <p>
        During his campaign, Trump made promises to cut taxes for middle-class workers and
        families, and to cut taxes for American businesses to make them more competitive.
      </p>
    </el-scrollbar>
    <el-scrollbar
      class="article w-[420px] pr-[20px]"
      height="330px"
      v-if="name === 'Obama'"
    >
      <h3>Barack Hussein Obama</h3>
      <p>
        Barack Hussein Obama (born 1961) 44th president of the United States (2009–2017)
      </p>
      <p>
        Barack Obama ran for president of the United States in 2007 under the slogan "Change yes we can". Barack Obama was successfully elected as the 44th President of the United States. Obama won the Nobel Peace Prize in October 2009, and in 2012 he defeated Republican candidate Willard Mitt Romney to be re-elected as the 45th President of the United States until January 2017.
      </p>
      <p>
        During Obama's eight years in office, the U.S. economy has evolved from recession to recovery, creating a large number of jobs and the largest increase in annual U.S. household income in U.S. history in 2016; Obama has carried out a series of health care reforms; diplomatically he is the first U.S. president to visit China within one year of taking office; Obama announced a series of measures to ease restrictions on Cuba, successfully promoted the normalization of relations with Cuba, and reached a nuclear deal with Iran; and the United States joined nearly 200 countries in signing the Paris Agreement to combat climate change .
      </p>
    </el-scrollbar>
  </div>
</template>

<style lang="postcss" scoped>
.article {
  h3 {
    font-weight: 700;
    font-size: 36px;
    line-height: 46px;
    color: #f3b922;
    margin-bottom: 18px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    margin-bottom: 12px;
  }
}
</style>
