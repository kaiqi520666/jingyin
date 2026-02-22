<template>
  <div class="flex flex-col h-screen w-full bg-darker overflow-hidden">
    <!-- 顶部导航栏 (Header) -->
    <header
      class="w-full border-b border-slate-800 bg-dark/80 backdrop-blur-xl z-30 shrink-0 relative"
    >
      <div class="flex items-center justify-between px-4 md:px-8 py-3 h-16">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <i class="ph ph-target text-primary text-3xl"></i>
          <h1 class="text-xl md:text-2xl font-bold tracking-wider">
            Eagle<span class="text-primary">Eye</span>
          </h1>
        </div>

        <!-- 桌面端导航 (中屏及以上显示) -->
        <nav class="hidden md:flex items-center gap-2 lg:gap-4 flex-1 justify-center">
          <router-link
            to="/dashboard"
            class="nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium text-sm lg:text-base"
            active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]"
          >
            <i class="ph ph-desktop text-lg"></i> 设备控制台
          </router-link>
          <router-link
            to="/shop"
            class="nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium text-sm lg:text-base"
            active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
          >
            <i class="ph ph-shopping-cart text-lg"></i> 设备购买
          </router-link>
          <router-link
            to="/query"
            class="nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium text-sm lg:text-base"
            active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
          >
            <i class="ph ph-magnifying-glass text-lg"></i> 违章查询
          </router-link>
          <router-link
            to="/profile"
            class="nav-item flex items-center gap-2 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all font-medium text-sm lg:text-base"
            active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
          >
            <i class="ph ph-user-circle text-lg"></i> 个人中心
          </router-link>
        </nav>

        <!-- 用户信息及退出 (桌面端) -->
        <div class="hidden md:flex items-center gap-4">
          <div
            class="flex items-center gap-3 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800"
          >
            <div
              class="w-8 h-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg text-sm"
            >
              {{ store.username.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 overflow-hidden pr-2">
              <div class="flex items-center gap-2">
                <p class="text-sm font-medium text-white truncate max-w-20">{{ store.username }}</p>
                <!-- 动态订阅徽章 -->
                <span
                  class="text-[10px] px-1.5 py-0.5 rounded border leading-none font-bold"
                  :class="{
                    'bg-slate-700 text-slate-300 border-slate-600': store.subscription === 'free',
                    'bg-blue-500/20 text-blue-400 border-blue-500/30':
                      store.subscription === 'basic',
                    'bg-primary/20 text-primary border-primary/30': store.subscription === 'pro',
                    'bg-secondary/20 text-secondary border-secondary/30':
                      store.subscription === 'ultimate',
                  }"
                  >{{ store.subscription }}</span
                >
              </div>
              <p class="text-[10px] text-yellow-400 font-mono leading-none mt-1">
                <i class="ph ph-coin"></i> {{ store.points }} pts
              </p>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="text-slate-500 hover:text-red-400 transition-colors"
            title="退出登录"
          >
            <i class="ph ph-sign-out text-2xl"></i>
          </button>
        </div>

        <!-- 移动端菜单按钮 (小屏显示) -->
        <button
          @click="toggleMenu"
          class="md:hidden text-slate-300 hover:text-white transition-colors p-1"
        >
          <i class="ph text-3xl" :class="isMenuOpen ? 'ph-x' : 'ph-list'"></i>
        </button>
      </div>

      <!-- 移动端下拉菜单 (H5 导航) -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="md:hidden absolute top-16 left-0 w-full bg-dark/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl z-40"
        >
          <nav class="flex flex-col px-4 py-4 space-y-2">
            <router-link
              to="/dashboard"
              @click="closeMenu"
              class="nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
              active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
            >
              <i class="ph ph-desktop text-xl"></i> 设备控制台
            </router-link>
            <router-link
              to="/shop"
              @click="closeMenu"
              class="nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
              active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
            >
              <i class="ph ph-shopping-cart text-xl"></i> 设备购买
            </router-link>
            <router-link
              to="/query"
              @click="closeMenu"
              class="nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
              active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
            >
              <i class="ph ph-magnifying-glass text-xl"></i> 违章查询
            </router-link>
            <router-link
              to="/profile"
              @click="closeMenu"
              class="nav-item flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all font-medium"
              active-class="bg-primary/10 text-primary hover:bg-primary/10 border border-primary/20"
            >
              <i class="ph ph-user-circle text-xl"></i> 个人中心
            </router-link>
          </nav>
          <div
            class="p-4 mx-4 mt-2 mb-4 border-t border-slate-700/50 flex justify-between items-center bg-slate-800/30 rounded-2xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg"
              >
                {{ store.username.charAt(0).toUpperCase() }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-sm font-medium text-white">{{ store.username }}</p>
                  <!-- 动态订阅徽章 -->
                  <span
                    class="text-[10px] px-1.5 py-0.5 rounded border font-bold"
                    :class="{
                      'bg-slate-700 text-slate-300 border-slate-600': store.subscription === '免费',
                      'bg-blue-500/20 text-blue-400 border-blue-500/30':
                        store.subscription === '基础',
                      'bg-primary/20 text-primary border-primary/30': store.subscription === '进阶',
                      'bg-secondary/20 text-secondary border-secondary/30':
                        store.subscription === '终极',
                    }"
                    >{{ store.subscription }}</span
                  >
                </div>
                <p class="text-xs text-yellow-400 font-mono mt-1">
                  <i class="ph ph-coin"></i> {{ store.points }} pts
                </p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="text-slate-400 hover:text-red-400 p-2 bg-slate-800 rounded-lg border border-slate-700"
            >
              <i class="ph ph-sign-out text-xl"></i>
            </button>
          </div>
        </div>
      </transition>
    </header>

    <!-- 下方主内容区 -->
    <main
      class="container mx-auto flex-1 flex flex-col relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"
    >
      <!-- 顶部装饰光晕 -->
      <div
        class="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
      ></div>

      <!-- 添加了 md:p-8 响应式内边距，适应手机端 -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useMessageBox } from '@/composables/useMessageBox'

const msgbox = useMessageBox()

const store = useUserStore()
const router = useRouter()

// 移动端菜单状态
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  msgbox.confirm('确定要退出登录吗？', '确认退出', '取消').then((confirmed) => {
    if (confirmed) {
      store.logout()
      router.push('/login')
    }
  })
}
</script>
