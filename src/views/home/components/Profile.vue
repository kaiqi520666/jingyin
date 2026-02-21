<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      <i class="ph ph-user-circle text-primary"></i> 个人中心
    </h2>

    <div class="flex flex-col gap-8">
      <!-- 第一行：USDT钱包卡片 -->
      <div class="glass-card rounded-3xl p-8 relative overflow-hidden">
        <!-- 炫酷背景 -->
        <div
          class="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-[80px]"
        ></div>
        <div
          class="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
        ></div>

        <div class="relative z-10">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <i class="ph ph-wallet text-2xl text-slate-300"></i> 资产钱包
            </h3>
            <span
              class="bg-slate-800 border border-slate-600 px-3 py-1 rounded-full text-xs text-slate-300 font-mono"
              >10 积分 = 1 USDT</span
            >
          </div>

          <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div class="flex-1 text-center md:text-left">
              <p class="text-slate-400 text-sm mb-1">当前累计积分</p>
              <p class="text-4xl font-bold font-mono text-white mb-1">
                <i class="ph ph-coin text-yellow-400 text-3xl"></i>
                {{ store.points.toLocaleString() }}
                <span class="text-lg text-slate-500 font-normal">pts</span>
              </p>
            </div>
            <div class="hidden md:block h-16 w-px bg-slate-700"></div>
            <div class="flex-1 text-center md:text-left">
              <p class="text-slate-400 text-sm mb-1">折合估值</p>
              <p class="text-4xl font-bold font-mono text-green-400 mb-1">
                ≈ $ {{ store.usdtBalance.toFixed(2) }}
                <span class="text-lg text-slate-500 font-normal">USDT</span>
              </p>
            </div>
          </div>

          <!-- 新增：绑定 USDT 钱包区域 -->
          <div class="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-6">
            <div class="flex justify-between items-center mb-3">
              <span class="text-sm text-slate-400 flex items-center gap-1"
                ><i class="ph ph-link text-lg"></i> USDT (TRC20) 收款地址</span
              >
              <button
                v-if="store.walletAddress && !isEditingWallet"
                @click="isEditingWallet = true"
                class="text-xs text-primary hover:text-cyan-300 transition-colors flex items-center gap-1"
              >
                <i class="ph ph-pencil-simple"></i> 修改
              </button>
            </div>

            <div
              v-if="!store.walletAddress || isEditingWallet"
              class="flex flex-col sm:flex-row gap-2"
            >
              <div class="relative flex-1">
                <i class="ph ph-wallet absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input
                  v-model="tempWallet"
                  type="text"
                  placeholder="输入 TRC20 钱包地址 (如 Txyz...)"
                  class="w-full bg-slate-900 border border-slate-600 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-200 transition-all font-mono"
                />
              </div>
              <div class="flex gap-2">
                <button
                  @click="handleBind"
                  class="flex-1 sm:flex-none px-5 py-2.5 bg-primary text-slate-900 text-sm font-bold rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-primary/20"
                >
                  保存
                </button>
                <button
                  v-if="store.walletAddress && isEditingWallet"
                  @click="cancelEdit"
                  class="flex-1 sm:flex-none px-4 py-2.5 bg-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-600 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>

            <div
              v-else
              class="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50"
            >
              <div
                class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shrink-0"
              >
                <i class="ph ph-check text-green-400 text-lg"></i>
              </div>
              <span class="text-sm font-mono text-slate-200 tracking-wider break-all">{{
                store.walletAddress
              }}</span>
            </div>
          </div>

          <!-- 提现进度条 -->
          <div class="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 relative">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-slate-400">提现门槛进度 (满 100 USDT)</span>
              <span :class="store.canWithdraw ? 'text-green-400 font-bold' : 'text-primary'"
                >{{ store.withdrawProgress.toFixed(0) }}%</span
              >
            </div>
            <div
              class="w-full h-3 bg-slate-800 rounded-full overflow-hidden mb-6 border border-slate-700"
            >
              <div
                class="h-full bg-linear-to-r from-primary to-green-400 transition-all duration-1000 ease-out relative"
                :style="{ width: store.withdrawProgress + '%' }"
              >
                <div class="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>

            <button
              @click="handleWithdraw"
              :disabled="!store.canWithdraw || !store.walletAddress"
              :class="[
                'w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all',
                store.canWithdraw && store.walletAddress
                  ? 'bg-green-500 text-slate-900 hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700',
              ]"
            >
              <i class="ph ph-currency-circle-dollar text-xl"></i>
              {{
                !store.walletAddress
                  ? '请先绑定 USDT 钱包'
                  : store.canWithdraw
                    ? '提取 USDT 至 Web3 钱包'
                    : '余额不足以提现'
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- 第二行：订阅充值区域 -->
      <div class="flex flex-col gap-4">
        <h3 class="text-lg font-semibold flex items-center gap-2 px-2">
          <i class="ph ph-crown text-yellow-500"></i> 数据订阅套餐
          <span class="text-xs text-slate-400 font-normal ml-2"
            >当前状态: <span class="text-primary font-bold">{{ store.subscription }}</span></span
          >
        </h3>

        <!-- 将套餐改为网格排列，大屏幕下横向铺开 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 套餐 1 -->
          <div
            class="glass-card rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-800/80"
            @click="store.purchaseSubscription('基础', 200)"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors"
              >
                <i class="ph ph-package text-2xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-white">基础订阅</h4>
                <p class="text-xs text-slate-400">获得 200 积分</p>
                <p class="text-[10px] text-yellow-500 mt-1">
                  <i class="ph ph-lightning"></i> 查询消耗: 100积分/次
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-lg font-bold font-mono">$ 20</span>
            </div>
          </div>

          <!-- 套餐 2 -->
          <div
            class="glass-card rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-800/80 border-primary/30 relative overflow-hidden"
            @click="store.purchaseSubscription('进阶', 500)"
          >
            <div
              class="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"
            ></div>
            <div class="flex items-center gap-4 relative z-10">
              <div
                class="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-slate-900 transition-colors shadow-lg shadow-primary/20"
              >
                <i class="ph ph-rocket-launch text-2xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-white flex items-center gap-2">
                  进阶订阅
                  <span
                    class="bg-primary text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold"
                    >POPULAR</span
                  >
                </h4>
                <p class="text-xs text-slate-400">获得 500 积分</p>
                <p class="text-[10px] text-yellow-500 mt-1">
                  <i class="ph ph-lightning"></i> 查询消耗: 50积分/次
                </p>
              </div>
            </div>
            <div class="text-right relative z-10">
              <span class="text-lg font-bold font-mono text-primary">$ 50</span>
            </div>
          </div>

          <!-- 套餐 3 -->
          <div
            class="glass-card rounded-2xl p-5 flex items-center justify-between group cursor-pointer hover:bg-slate-800/80"
            @click="store.purchaseSubscription('终极', 1000)"
          >
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors"
              >
                <i class="ph ph-sketch-logo text-2xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-white">终极订阅</h4>
                <p class="text-xs text-slate-400">获得 1000 积分</p>
                <p class="text-[10px] text-yellow-500 mt-1">
                  <i class="ph ph-lightning"></i> 查询消耗: 20积分/次
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-lg font-bold font-mono text-secondary">$ 100</span>
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-500 text-center mt-2">
          <i class="ph ph-info"></i> 点击套餐可模拟购买、获得积分并升级订阅状态
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'

const store = useUserStore()

// 钱包绑定的组件状态
const tempWallet = ref('')
const isEditingWallet = ref(false)

// 组件挂载时，如果已有钱包地址，将其同步到临时输入框
onMounted(() => {
  if (store.walletAddress) {
    tempWallet.value = store.walletAddress
  }
})

// 处理绑定逻辑
const handleBind = () => {
  if (tempWallet.value.trim().length < 10) {
    alert('请输入有效的 TRC20 钱包地址！')
    return
  }
  store.bindWallet(tempWallet.value.trim())
  isEditingWallet.value = false
}

// 取消修改
const cancelEdit = () => {
  tempWallet.value = store.walletAddress
  isEditingWallet.value = false
}

const handleWithdraw = () => {
  store.withdraw()
}
</script>
