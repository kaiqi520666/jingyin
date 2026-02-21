<template>
  <div class="space-y-6 animate-fade-in">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      <i class="ph ph-desktop text-primary"></i> 设备控制台
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 状态卡片 -->
      <div class="glass-card rounded-2xl p-6 relative overflow-hidden group">
        <div
          class="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"
        ></div>
        <div class="flex justify-between items-start relative z-10">
          <div>
            <p class="text-slate-400 text-sm font-medium mb-1">设备连接状态</p>
            <div class="flex items-center gap-3 mt-2">
              <div class="relative flex h-4 w-4">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-4 w-4 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                ></span>
              </div>
              <span class="text-2xl font-semibold text-white tracking-wide">在线 (鹰眼 Pro)</span>
            </div>
            <p class="text-xs text-slate-500 mt-4">
              <i class="ph ph-cpu mr-1"></i>算力正常运行中 | 延迟 12ms
            </p>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <i class="ph ph-broadcast text-2xl text-green-400"></i>
          </div>
        </div>
      </div>

      <!-- 位置卡片 -->
      <div class="glass-card rounded-2xl p-6 relative overflow-hidden group">
        <div
          class="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"
        ></div>
        <div class="flex justify-between items-start relative z-10">
          <div>
            <p class="text-slate-400 text-sm font-medium mb-1">当前监控位置</p>
            <p class="text-lg font-medium text-white mt-2 flex items-center gap-2">
              <i class="ph ph-map-pin text-primary"></i> 新加坡·滨海湾大道
            </p>
            <p
              class="text-xs text-slate-400 font-mono mt-2 bg-slate-900/50 inline-block px-2 py-1 rounded"
            >
              LAT: 1.2834° N, LNG: 103.859° E
            </p>
          </div>
          <div class="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
            <i class="ph ph-crosshair text-2xl text-blue-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 抓拍记录 -->
    <div class="glass-card rounded-2xl p-6 relative overflow-hidden">
      <div class="absolute right-1/2 top-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
      <div class="flex justify-between items-center mb-6 relative z-10">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <i class="ph ph-camera text-slate-400"></i> 实时抓拍流
        </h3>
        <span
          class="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30 flex items-center gap-1"
        >
          <i class="ph ph-spinner-gap animate-spin"></i> 监控中
        </span>
      </div>

      <div class="overflow-x-auto relative z-10">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-slate-400 text-sm border-b border-slate-700/50">
              <th class="pb-3 font-medium">时间</th>
              <th class="pb-3 font-medium">车牌号码</th>
              <th class="pb-3 font-medium">违章类型</th>
              <th class="pb-3 font-medium text-right">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(record, index) in captures"
              :key="index"
              class="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
            >
              <td class="py-4 text-sm text-slate-300">{{ record.time }}</td>
              <td class="py-4 font-mono text-primary bg-primary/5 px-2 rounded">
                {{ record.plate }}
              </td>
              <td class="py-4 text-sm">
                <span class="w-2 h-2 rounded-full inline-block mr-2" :class="record.color"></span
                >{{ record.type }}
              </td>
              <td class="py-4 text-right">
                <span
                  class="text-xs px-2.5 py-1 rounded border font-medium"
                  :class="getStatusStyle(record.status)"
                  >{{ record.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const captures = ref([
  {
    time: '10分钟前',
    plate: 'SGA 1234 A',
    type: '实线变道',
    status: '已上传区块链',
    color: 'bg-yellow-500',
  },
  {
    time: '35分钟前',
    plate: 'JBA 8888',
    type: '违章停车',
    status: '审核中',
    color: 'bg-red-500',
  },
  {
    time: '2小时前',
    plate: 'SMC 9527 X',
    type: '压导流线',
    status: '已获奖励',
    color: 'bg-green-500',
  },
])

// 根据不同状态返回不同的 Tailwind CSS 颜色类组合
const getStatusStyle = (status) => {
  switch (status) {
    case '已获奖励':
      return 'text-green-400 bg-green-500/10 border-green-500/30'
    case '审核中':
      return 'text-orange-400 bg-orange-500/10 border-orange-500/30'
    case '已上传区块链':
      return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    default:
      return 'text-slate-300 bg-slate-800 border-slate-700'
  }
}
</script>
