<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="props.logo" :src="props.logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ props.title }}</h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="props.logo" :src="props.logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ props.title }}</h1>
      </router-link>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { settings } from "@/common/settings";
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: settings.title,
  },
  logo: {
    type: String,
    default: new URL("../../../assets/images/logo.svg", import.meta.url).href,
  },
});
</script>
<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 8px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
