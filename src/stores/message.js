import { ref } from 'vue'
import { defineStore } from 'pinia'

let id = 0

export const useMessageStore = defineStore('message', () => {
  const messages = ref([])

  const add = (content, type = 'info', duration = 3000) => {
    const messageId = ++id
    
    messages.value.push({
      id: messageId,
      content,
      type,
    })

    if (duration > 0) {
      setTimeout(() => {
        remove(messageId)
      }, duration)
    }

    return messageId
  }

  const remove = (messageId) => {
    const index = messages.value.findIndex((msg) => msg.id === messageId)
    if (index > -1) {
      messages.value.splice(index, 1)
    }
  }

  const clear = () => {
    messages.value = []
  }

  // 便捷方法
  const success = (content, duration) => add(content, 'success', duration)
  const error = (content, duration) => add(content, 'error', duration)
  const warning = (content, duration) => add(content, 'warning', duration)
  const info = (content, duration) => add(content, 'info', duration)

  return {
    messages,
    add,
    remove,
    clear,
    success,
    error,
    warning,
    info,
  }
})