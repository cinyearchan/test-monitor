import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'

export function injectJsError() {
  // 监听全局未捕获的错误
  window.addEventListener('error', function(event) { // 错误事件对象
    console.log(event)
    let lastEvent = getLastEvent() // 获取最后一个交互事件
    console.log(lastEvent)
    let log = {
      kind: 'stability', // 监控指标的大类
      type: 'error', // 小类型 这是一个错误
      errorType: 'jsError', // js 执行错误
      url: '', // 报错时的访问路径
      message: event.message, // 报错信息
      filename: event.filename, // 报错的文件名
      position: `${event.lineno}:${event.colno}`,
      stack: getLines(event.error.stack),
      selector: lastEvent ? getSelector(lastEvent.path) : ''// 代表最后一个操作的元素
    }

    console.log(log)
  })

  function getLines(stack) {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^')
  }
}
