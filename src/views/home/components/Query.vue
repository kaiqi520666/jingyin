<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      <i class="ph ph-magnifying-glass text-primary"></i> 违章网络查询
    </h2>

    <!-- 搜索框区域 -->
    <div class="glass-card rounded-2xl p-8 relative overflow-hidden text-center">
      <div
        class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"
      ></div>
      <h3 class="text-xl font-semibold mb-2 relative z-10">全局车牌追踪网络</h3>

      <!-- 动态展示当前订阅及查询消耗 -->
      <p class="text-sm text-slate-400 mb-6 relative z-10">
        当前特权：<span class="text-primary font-bold mr-2">[{{ store.subscription }}]</span>
        单次查询消耗：<span class="text-yellow-400 font-bold font-mono">{{ store.queryCost }}</span>
        积分
      </p>

      <div class="max-w-xl mx-auto relative z-10 flex gap-4">
        <div class="relative flex-1">
          <i
            class="ph ph-car-profile absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
          ></i>
          <input
            type="text"
            placeholder="输入车牌号查询违章记录 (如: SGA1234)"
            class="w-full bg-slate-900/80 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-lg font-mono uppercase transition-all shadow-inner"
          />
        </div>
        <button
          @click="handleQuery"
          class="bg-primary text-slate-900 px-8 rounded-xl font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-primary/20 flex flex-col items-center justify-center gap-0.5"
        >
          <span class="flex items-center gap-2"><i class="ph ph-magnifying-glass"></i> 检索</span>
          <span class="text-[10px] opacity-70 font-mono">-{{ store.queryCost }} pts</span>
        </button>
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="glass-card rounded-2xl p-6 relative overflow-hidden mt-6">
      <h3 class="text-lg font-semibold flex items-center gap-2 mb-4">
        <i class="ph ph-clock-counter-clockwise text-slate-400"></i> 我的查询历史
      </h3>
      <div class="space-y-3">
        <div
          v-for="record in historyRecords"
          :key="record.id"
          class="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors group"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors"
            >
              <i class="ph ph-file-search text-slate-300 group-hover:text-primary"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <p class="font-mono text-primary font-bold">{{ record.plate }}</p>
                <span
                  class="text-[10px] px-1.5 py-0.5 rounded border"
                  :class="record.statusClass"
                  >{{ record.status }}</span
                >
              </div>
              <p class="text-xs text-slate-400 mt-1">{{ record.queryTime }} 检索</p>
            </div>
          </div>
          <button
            @click="openDetails(record)"
            class="text-sm text-slate-400 hover:text-white underline decoration-slate-600 hover:decoration-primary underline-offset-4 transition-all"
          >
            查看详情
          </button>
        </div>
      </div>
    </div>

    <!-- 新增：详情弹窗 (Modal) -->
    <transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
      >
        <!-- 遮罩层 -->
        <div class="absolute inset-0 bg-darker/80 backdrop-blur-sm" @click="closeModal"></div>

        <!-- 弹窗内容 -->
        <div
          class="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-600/50"
        >
          <!-- 关闭按钮 -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 p-2 rounded-full transition-colors border border-slate-700"
          >
            <i class="ph ph-x text-lg"></i>
          </button>

          <!-- 标题 -->
          <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/30 shadow-inner"
            >
              <i class="ph ph-files text-xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white">检索详情报告</h3>
              <p class="text-xs text-slate-400 font-mono mt-0.5">Report ID: #EQ-{{ recordHash }}</p>
            </div>
          </div>

          <!-- 详情内容 -->
          <div v-if="selectedRecord" class="space-y-4">
            <!-- 核心摘要 -->
            <div
              class="flex justify-between items-center bg-linear-to-r from-slate-900 to-slate-800 p-5 rounded-xl border border-slate-700 shadow-inner"
            >
              <div>
                <p class="text-xs text-slate-400 mb-1"><i class="ph ph-target"></i> 目标车牌</p>
                <p class="text-2xl font-mono font-bold text-primary tracking-wider">
                  {{ selectedRecord.plate }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-xs text-slate-400 mb-1">系统评定状态</p>
                <span
                  class="text-sm px-2.5 py-1 rounded border font-medium"
                  :class="selectedRecord.statusClass"
                  >{{ selectedRecord.status }}</span
                >
              </div>
            </div>

            <!-- 详情网格 -->
            <div class="grid grid-cols-2 gap-3">
              <div
                class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
              >
                <p class="text-xs text-slate-500 mb-1">
                  <i class="ph ph-calendar-blank"></i> 违章发生时间
                </p>
                <p class="text-sm text-slate-200 font-medium">{{ selectedRecord.incidentTime }}</p>
              </div>
              <div
                class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
              >
                <p class="text-xs text-slate-500 mb-1">
                  <i class="ph ph-warning-circle"></i> 违章类型
                </p>
                <p class="text-sm text-slate-200 font-medium">{{ selectedRecord.type }}</p>
              </div>
              <div
                class="col-span-2 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
              >
                <p class="text-xs text-slate-500 mb-1">
                  <i class="ph ph-map-pin"></i> 发生地点坐标
                </p>
                <p class="text-sm text-slate-200 font-medium">{{ selectedRecord.location }}</p>
              </div>
              <div
                class="col-span-2 bg-slate-900/80 p-4 rounded-xl border border-slate-700 shadow-inner"
              >
                <p class="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  <i class="ph ph-link"></i> 证据链哈希 (IPFS)
                </p>
                <p class="text-xs font-mono text-slate-400 break-all leading-relaxed">
                  0x{{ Math.random().toString(16).substr(2, 40) }}...
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <button
              @click="closeModal"
              class="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-600 hover:border-slate-500 shadow-lg"
            >
              关闭报告
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
// 模拟的历史记录数据
const historyRecords = ref([
  {
    id: 1,
    plate: 'JBA 8888',
    queryTime: '2023-10-15 14:00',
    incidentTime: '2023-10-14 09:30',
    type: '违章停车',
    location: '新加坡·乌节路 32号路段',
    status: '已确认违章',
    statusClass: 'text-red-400 bg-red-500/10 border-red-500/30',
  },
  {
    id: 2,
    plate: 'SGA 1234 A',
    queryTime: '2023-10-12 09:15',
    incidentTime: '2023-10-10 18:45',
    type: '实线变道',
    location: '新加坡·滨海湾大道 辅路',
    status: '审核中',
    statusClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  },
  {
    id: 3,
    plate: 'SMC 9527 X',
    queryTime: '2023-10-08 21:30',
    incidentTime: '2023-10-01 12:00',
    type: '压导流线',
    location: '新加坡·樟宜机场 T3航站楼出发层',
    status: '已处罚结案',
    statusClass: 'text-green-400 bg-green-500/10 border-green-500/30',
  },
])

// 弹窗状态管理
const isModalOpen = ref(false)
const selectedRecord = ref(null)
const recordHash = ref('')

// 绑定检索按钮的点击事件
const handleQuery = () => {
  store.performQuery()
}

// 打开详情弹窗
const openDetails = (record) => {
  selectedRecord.value = record
  // 生成一个随机的报告ID，增加真实感
  recordHash.value = Math.floor(100000 + Math.random() * 900000)
  isModalOpen.value = true
}

// 关闭弹窗
const closeModal = () => {
  isModalOpen.value = false
  setTimeout(() => {
    selectedRecord.value = null
  }, 300) // 等待动画结束后清空数据
}
</script>
