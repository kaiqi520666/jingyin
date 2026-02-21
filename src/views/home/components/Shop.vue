<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      <i class="ph ph-shopping-cart text-primary"></i> 算力设备商城
    </h2>
    <p class="text-slate-400 text-sm">部署边缘计算节点，提升抓拍效率与收益。</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <!-- Eagle Eye -->
      <div class="glass-card rounded-2xl p-8 relative overflow-hidden group flex flex-col">
        <div
          class="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transition-all group-hover:bg-blue-500/20"
        ></div>
        <div class="relative z-10 flex-1">
          <div
            class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 mb-6"
          >
            <i class="ph ph-eye text-2xl text-blue-400"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">鹰眼</h3>
          <p class="text-slate-400 text-sm mb-6">基础版车载AI摄像头，适合日常通勤。</p>
          <div class="text-3xl font-bold text-white mb-6">$80</div>
          <ul class="space-y-3 text-sm text-slate-300 mb-8">
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 1080P 识别
            </li>
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 基础算力奖励
            </li>
          </ul>
        </div>
        <button
          class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 transition-colors z-10 font-medium"
        >
          购买设备
        </button>
      </div>

      <!-- Eagle Eye Lite -->
      <div
        class="glass-card rounded-2xl p-8 relative overflow-hidden group flex flex-col border-primary/30"
      >
        <!-- 推荐角标 -->
        <div
          class="absolute top-0 right-0 bg-linear-to-r from-primary to-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg z-20 shadow-lg"
        >
          HOT
        </div>

        <div class="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent"></div>
        <div
          class="absolute -left-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl transition-all group-hover:bg-primary/30"
        ></div>

        <div class="relative z-10 flex-1">
          <div
            class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/30 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <i class="ph ph-aperture text-2xl text-primary"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">鹰眼 Lite</h3>
          <p class="text-slate-400 text-sm mb-6">进阶版光学传感器，夜视能力增强。</p>
          <div class="text-3xl font-bold text-primary mb-6">$120</div>
          <ul class="space-y-3 text-sm text-slate-300 mb-8">
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 2K 高清识别
            </li>
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 微光夜视增强
            </li>
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 1.5倍收益加成
            </li>
          </ul>
        </div>
        <button
          class="w-full py-3 rounded-xl bg-primary text-slate-900 font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-primary/20 z-10"
        >
          购买设备
        </button>
      </div>

      <!-- Eagle Eye Pro -->
      <div class="glass-card rounded-2xl p-8 relative overflow-hidden group flex flex-col">
        <div
          class="absolute -right-8 -top-8 w-32 h-32 bg-secondary/10 rounded-full blur-2xl transition-all group-hover:bg-secondary/20"
        ></div>
        <div class="relative z-10 flex-1">
          <div
            class="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 mb-6"
          >
            <i class="ph ph-diamond text-2xl text-secondary"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">鹰眼 Pro</h3>
          <p class="text-slate-400 text-sm mb-6">专业级边缘计算终端，极致捕捉体验。</p>
          <div class="text-3xl font-bold text-white mb-6">$200</div>
          <ul class="space-y-3 text-sm text-slate-300 mb-8">
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 4K 广角矩阵
            </li>
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 独立AI芯片加速
            </li>
            <li class="flex items-center gap-2">
              <i class="ph ph-check-circle text-primary"></i> 3倍最高收益加成
            </li>
          </ul>
        </div>
        <button
          class="w-full py-3 rounded-xl border border-slate-600 hover:bg-slate-700 transition-colors z-10 font-medium"
        >
          购买设备
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()
</script>
