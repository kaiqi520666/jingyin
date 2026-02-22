import { ref, createApp, h } from 'vue'
import GlobalMessageBox from '@/components/GlobalMessageBox.vue'

let messageBoxInstance = null
let messageBoxApp = null

const createMessageBox = () => {
  if (messageBoxInstance) return messageBoxInstance

  const container = document.createElement('div')
  document.body.appendChild(container)

  messageBoxApp = createApp(GlobalMessageBox)
  messageBoxInstance = messageBoxApp.mount(container)

  return messageBoxInstance
}

export const useMessageBox = () => {
  const messageBox = createMessageBox()

  const confirm = (message, title = '确认', options = {}) => {
    return messageBox.open({
      type: 'confirm',
      title,
      message,
      showCancel: true,
      confirmText: options.confirmText || '确认',
      cancelText: options.cancelText || '取消',
    })
  }

  const alert = (message, title = '提示', options = {}) => {
    return messageBox.open({
      type: options.type || 'info',
      title,
      message,
      showCancel: false,
      confirmText: options.confirmText || '确定',
    })
  }

  const success = (message, title = '成功', options = {}) => {
    return messageBox.open({
      type: 'success',
      title,
      message,
      showCancel: false,
      confirmText: options.confirmText || '确定',
    })
  }

  const error = (message, title = '错误', options = {}) => {
    return messageBox.open({
      type: 'error',
      title,
      message,
      showCancel: false,
      confirmText: options.confirmText || '确定',
    })
  }

  const warning = (message, title = '警告', options = {}) => {
    return messageBox.open({
      type: 'warning',
      title,
      message,
      showCancel: false,
      confirmText: options.confirmText || '确定',
    })
  }

  return {
    confirm,
    alert,
    success,
    error,
    warning,
  }
}

// 全局挂载方法（可选）
export const installMessageBox = (app) => {
  app.config.globalProperties.$msgbox = useMessageBox()
  app.provide('messageBox', useMessageBox())
}
