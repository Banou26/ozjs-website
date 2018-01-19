const getSelection = host => host.getSelection ? host.getSelection() : window.getSelection()

const makeSelection = (host, range) => {
  let sel = getSelection(host)
  sel.removeAllRanges()
  sel.addRange(range)
}

export const caret = (host, el, pos) => {
  const sel = getSelection(host)
  if (!pos) {
    const range = sel.getRangeAt(0)
    const clone = range.cloneRange()
    clone.selectNodeContents(el)
    clone.setEnd(range.endContainer, range.endOffset)
    const end = clone.toString().length
    clone.setStart(range.startContainer, range.startOffset)
    return {
      start: end - clone.toString(),
      end,
      atStart: clone.startOffset === 0,
      commonAncestorContainer: clone.commonAncestorContainer,
      endContainer: clone.endContainer,
      startContainer: clone.startContainer
    }
  }
  let setSel = pos.end && (pos.end !== pos.start)
  let length = 0
  let startindex
  let start = pos.start > el.textContent.length ? el.textContent.length : pos.start
  let end = pos.end > el.textContent.length ? el.textContent.length : pos.end
  let atStart = pos.atStart
  let range = document.createRange()
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false)
  while (walker.nextNode()) {
    let olen = length
    const currentNode = walker.currentNode
    length += currentNode.textContent.length

    let atLength = atStart ? length > start : length >= start
    if (!startindex && atLength) {
      startindex = true
      range.setStart(currentNode, start - olen)
      if (!setSel) {
        range.collapse(true)
        makeSelection(host, range)
        break
      }
    }

    if (setSel && (length >= end)) {
      range.setEnd(currentNode, end - olen)
      makeSelection(host, range)
      break
    }
  }
}