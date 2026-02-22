<template>
  <teleport to="body">
    <transition name="messagebox">
      <div v-if="visible" class="messagebox-overlay">
        <!-- 遮罩层 -->
        <div class="messagebox-mask" @click="handleCancel"></div>

        <!-- 弹窗内容 -->
        <div class="messagebox-wrapper">
          <div class="messagebox-content">
            <!-- 图标 -->
            <div :class="['messagebox-icon', `icon-${type}`]">
              <i :class="getIcon"></i>
            </div>

            <!-- 标题 -->
            <h3 class="messagebox-title">{{ title }}</h3>

            <!-- 消息内容 -->
            <p class="messagebox-message">{{ message }}</p>

            <!-- 按钮区域 -->
            <div class="messagebox-actions">
              <button
                v-if="showCancel"
                class="messagebox-btn messagebox-btn-cancel"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button :class="['messagebox-btn', `messagebox-btn-${type}`]" @click="handleConfirm">
                {{ confirmText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'

const visible = ref(false)
const title = ref('提示')
const message = ref('')
const type = ref('info')
const showCancel = ref(true)
const confirmText = ref('确认')
const cancelText = ref('取消')

let resolvePromise = null
let rejectPromise = null

const getIcon = computed(() => {
  const icons = {
    success: 'ph ph-check-circle',
    error: 'ph ph-x-circle',
    warning: 'ph ph-warning',
    info: 'ph ph-info',
    confirm: 'ph ph-question',
  }
  return icons[type.value] || icons.info
})

// 打开弹窗
const open = (options) => {
  title.value = options.title || '提示'
  message.value = options.message || ''
  type.value = options.type || 'info'
  showCancel.value = options.showCancel !== false
  confirmText.value = options.confirmText || '确认'
  cancelText.value = options.cancelText || '取消'
  visible.value = true

  return new Promise((resolve, reject) => {
    resolvePromise = resolve
    rejectPromise = reject
  })
}

// 确认
const handleConfirm = () => {
  visible.value = false
  if (resolvePromise) {
    resolvePromise('confirm')
    resolvePromise = null
  }
}

// 取消
const handleCancel = () => {
  visible.value = false
  if (rejectPromise) {
    rejectPromise('cancel')
    rejectPromise = null
  }
}

// 暴露方法
defineExpose({
  open,
})
</script>

<style scoped>
.messagebox-overlay {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.messagebox-mask {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.messagebox-wrapper {
  position: relative;
  z-index: 1;
  animation: messagebox-bounce 0.3s ease;
}

@keyframes messagebox-bounce {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.messagebox-content {
  width: 100%;
  max-width: 400px;
  padding: 32px;
  text-align: center;
  background: rgba(30, 41, 59, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.messagebox-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 32px;
}

.icon-success {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
}

.icon-error {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.icon-warning {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.icon-info {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.icon-confirm {
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
}

.messagebox-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 600;
  color: #f8fafc;
}

.messagebox-message {
  margin: 0 0 28px;
  font-size: 15px;
  line-height: 1.6;
  color: #94a3b8;
}

.messagebox-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.messagebox-btn {
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;
}

.messagebox-btn-cancel {
  background: rgba(71, 85, 105, 0.5);
  color: #e2e8f0;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.messagebox-btn-cancel:hover {
  background: rgba(71, 85, 105, 0.8);
  border-color: rgba(148, 163, 184, 0.5);
}

.messagebox-btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
}

.messagebox-btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
}

.messagebox-btn-error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
}

.messagebox-btn-error:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.5);
}

.messagebox-btn-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
}

.messagebox-btn-warning:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
}

.messagebox-btn-info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.messagebox-btn-info:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.messagebox-btn-confirm {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
}

.messagebox-btn-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

/* 过渡动画 */
.messagebox-enter-active,
.messagebox-leave-active {
  transition: opacity 0.3s ease;
}

.messagebox-enter-from,
.messagebox-leave-to {
  opacity: 0;
}
</style>
