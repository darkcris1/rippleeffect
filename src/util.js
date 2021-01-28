function checkProps(prop) {
  if (/^-+/.test(prop)) return prop
  if (/([^\-]+)([A-Z])/g.test(prop))
    return prop.replace(/[A-Z]/g, (x) => '-' + x.toLowerCase())
  return prop.toLowerCase()
}

export function tag(el, option) {
  const newEl = el instanceof Element ? el : document.createElement(el)
  if (!option) return newEl
  for (let key in option) {
    const val = option[key]

    if (/^on([A-Z][a-z A-Z])+/.test(key)) {
      const event = key.toLowerCase().substr(2)
      newEl.addEventListener(event, val)
      continue
    }

    switch (key) {
      case 'style':
        styles(newEl, val)
        break
      case 'appendTo':
        if (!val) break
        val.appendChild(newEl)
        break
      case 'appendChild':
        newEl.appendChild(val)
        break
      case 'dataset':
        newEl.dataset[val[0]] = val[1] || ''
        break
      default:
        newEl[key] = val
    }
  }
  return newEl
}
export function styles(el, option) {
  if (typeof option === 'string')
    return getComputedStyle(el).getPropertyValue(checkProps(option))

  for (let key in option) {
    el.style.setProperty(checkProps(key), option[key])
  }
}
export function edit(el, option) {
  tag(el, option)
  return {
    on: (event, callback, bubble) => {
      event.split(' ').forEach((ev) => {
        el.addEventListener(ev, callback, bubble)
      })
    },
    off: (event, callback) => {
      event.split(' ').forEach((ev) => {
        el.removeEventListener(ev, callback)
      })
    },
  }
}

export function isSelfTag(element) {
  const listOfSelfClosingTag = [
    'hr',
    'br',
    'img',
    'col',
    'input',
    'embed',
    'area',
    'base',
    'keygen',
    'source',
    'track',
    'wbr',
  ]
  return listOfSelfClosingTag.indexOf(element.tagName.toLowerCase()) > -1
}

export function offset(elem) {
  let docElem,
    box = {
      top: 0,
      left: 0,
    },
    doc = elem && elem.ownerDocument

  docElem = doc.documentElement

  if (typeof elem.getBoundingClientRect !== 'undefined') {
    box = elem.getBoundingClientRect()
  }
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft,
  }
}

function convertToArray(array) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result.push(array[i])
  }
  return result
}
export function elementToArray(selector, parent = document) {
  const isElems =
    selector instanceof HTMLCollection || selector instanceof NodeList
  return isElems
    ? convertToArray(selector)
    : selector instanceof Element
    ? [selector]
    : convertToArray(parent.querySelectorAll(selector))
}
