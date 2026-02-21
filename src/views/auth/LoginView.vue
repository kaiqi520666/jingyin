<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden">
    <!-- 背景装饰元素 -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
    <div
      class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"
    ></div>

    <div
      class="glass-card w-full max-w-md p-8 rounded-3xl relative z-10 transition-all duration-300"
    >
      <div class="text-center mb-10">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary mb-4 shadow-lg shadow-primary/30"
        >
          <i class="ph ph-target text-3xl text-white"></i>
        </div>
        <h1 class="text-2xl font-bold tracking-wider">
          Eagle<span class="text-primary">Eye</span>
        </h1>
        <p class="text-slate-400 mt-2 text-sm">
          {{ isLoginMode ? '交通违章抓拍与举报网络' : '加入全球车牌追踪网络' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">账号</label>
          <div class="relative">
            <i class="ph ph-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
              placeholder="请输入账号"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-400 mb-2">密码</label>
          <div class="relative">
            <i class="ph ph-lock-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- 注册模式下才显示的确认密码框 -->
        <div v-if="!isLoginMode" class="animate-fade-in">
          <label class="block text-sm font-medium text-slate-400 mb-2">确认密码</label>
          <div class="relative">
            <i
              class="ph ph-check-circle absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            ></i>
            <input
              v-model="form.confirmPassword"
              type="password"
              required
              class="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-slate-600"
              placeholder="请再次输入密码"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-linear-to-r from-primary to-blue-500 text-white font-medium py-3 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-0.5 mt-2"
        >
          {{ isLoginMode ? '登录系统' : '注册账号' }}
        </button>

        <!-- 切换登录/注册模式 -->
        <div class="text-center mt-6">
          <button
            type="button"
            @click="toggleMode"
            class="text-sm text-slate-400 hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-0.5"
          >
            {{ isLoginMode ? '没有账号？立即注册' : '已有账号？直接登录' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

// 控制当前所处模式 (登录 or 注册)
const isLoginMode = ref(true)
const form = reactive({ username: '', password: '', confirmPassword: '' })

// 切换模式并清空表单
const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
}

const handleSubmit = () => {
  if (form.username && form.password) {
    // 如果处于注册模式，需要校验密码一致性
    if (!isLoginMode.value) {
      if (form.password !== form.confirmPassword) {
        alert('两次输入的密码不一致，请重新输入！')
        return
      }
      alert('注册成功！系统已自动为您登录。')
    }

    // 执行登录并跳转
    store.login(form.username)
    router.push('/dashboard')
  }
}
</script>
