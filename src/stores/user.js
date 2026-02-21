import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('username')
  const subscription = ref('free')
  const points = ref(1000)
  const walletAddress = ref('')
  const usdtBalance = computed(() => {
    return points.value / 10
  })
  const isLoggedIn = ref(false)
  const login = (user) => {
    isLoggedIn.value = true
    username.value = user
  }
  const withdrawProgress = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  const queryCost = computed(() => {
    switch (subscription.value) {
      case 'basic':
        return 100
      case 'advance':
        return 50
      case 'ultimate':
        return 20
      default:
        return 200 // 免费用户消耗极高，促使用户升级
    }
  })
  const logout = () => {
    isLoggedIn.value = false
    username.value = ''
  }

  return {
    username,
    doubleCount,
    increment,
    subscription,
    points,
    queryCost,
    walletAddress,
    usdtBalance,
    withdrawProgress,
    isLoggedIn,
    login,
    logout,
  }
})
