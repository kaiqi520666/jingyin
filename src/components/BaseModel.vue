<template>
  <transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <!-- 遮罩层 -->
      <div class="absolute inset-0 bg-darker/80 backdrop-blur-sm" @click="closeModal"></div>

      <!-- 弹窗内容 -->
      <div
        class="glass-card w-full max-w-lg rounded-3xl p-6 md:p-8 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-600/50"
      >
        <!-- 关闭按钮 -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 w-10 h-10 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 flex items-center justify-center rounded-full transition-colors border border-slate-700"
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
            <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            <p v-if="reportId" class="text-xs text-slate-400 font-mono mt-0.5">
              Report ID: {{ reportId }}
            </p>
          </div>
        </div>

        <!-- 内容插槽 -->
        <div class="space-y-4">
          <slot></slot>
        </div>

        <!-- 底部按钮区域 -->
        <div class="mt-8">
          <slot name="footer">
            <button
              @click="closeModal"
              class="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-600 hover:border-slate-500 shadow-lg"
            >
              关闭
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '详情报告',
  },
  reportId: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
