function getSelectors(path) {
  return path.reverse().filter(element => {
    return element !== document && element !== window // 去除 document 和 window
  }).map(element => {
    let selector = ""
    if (element.id) {
      return `${element.nodeName.toLowerCase()}#${element.id}`
    } else if (element.className && typeof element.className === 'string') {
      return `${element.nodeName.toLowerCase()}.${element.className.split(' ').join('.')}`
    } else {
      selector = element.nodeName.toLowerCase()
    }
    return selector
  }).join(' ')
}

export default function (path) {
  if (Array.isArray(path)) {
    return getSelectors(path)
  }
}
