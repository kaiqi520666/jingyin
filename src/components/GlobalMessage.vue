<template>
  <teleport to="body">
    <transition-group name="message" tag="div" class="message-container">
      <div v-for="msg in messages" :key="msg.id" :class="['message-item', `message-${msg.type}`]">
        <div class="message-icon">
          <i :class="getIcon(msg.type)"></i>
        </div>
        <div class="message-content">{{ msg.content }}</div>
        <button class="message-close" @click="removeMessage(msg.id)">
          <i class="ph ph-x"></i>
        </button>
      </div>
    </transition-group>
  </teleport>
</template>

<script setup>
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const messages = messageStore.messages

const getIcon = (type) => {
  const icons = {
    success: 'ph ph-check-circle',
    error: 'ph ph-x-circle',
    warning: 'ph ph-warning',
    info: 'ph ph-info',
  }
  return icons[type] || icons.info
}

const removeMessage = (id) => {
  messageStore.remove(id)
}
</script>

<style scoped>
.message-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  min-width: 300px;
  max-width: 500px;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  transition: all 0.3s ease;
}

.message-success {
  border-left: 4px solid #10b981;
}

.message-error {
  border-left: 4px solid #ef4444;
}

.message-warning {
  border-left: 4px solid #f59e0b;
}

.message-info {
  border-left: 4px solid #3b82f6;
}

.message-icon {
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.message-success .message-icon {
  color: #10b981;
}

.message-error .message-icon {
  color: #ef4444;
}

.message-warning .message-icon {
  color: #f59e0b;
}

.message-info .message-icon {
  color: #3b82f6;
}

.message-content {
  flex: 1;
  color: #f1f5f9;
  font-size: 14px;
  line-height: 1.5;
}

.message-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #94a3b8;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.message-close:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.1);
}

/* 动画 */
.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.message-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.9);
}

.message-move {
  transition: transform 0.3s ease;
}
</style>
