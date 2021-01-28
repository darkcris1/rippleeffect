import * as es from './util'
const defaultOption = {
  background: 'rgb(150,150,150)',
  opacity: 0.5,
  zIndex: 99,
  duration: 700,
  timing: 'ease',
  outDuration: 800,
}

const { tag, edit, offset, elementToArray, isSelfTag, styles } = es

// Inject styles into head
tag('style', {
  innerHTML: `.ripleParent__{overflow:hidden;background:transparent;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.riple__{border-radius:50%;position: absolute;will-change:transform; pointer-events:none;}@keyframes ripple__{0%{transform: translate(-50%,-50%) scale(0);}100%{transform: translate(-50%,-50%) scale(1);}}`,
  appendTo: document.head,
})

function ripple(elmnt = '_', option = {}) {
  // Configuration
  option = {
    ...defaultOption,
    ...option,
  }
  const {
    background,
    opacity,
    zIndex,
    duration,
    timing,
    height,
    width,
    triggerOnChild = true,
    triggerExcept = '_',
    outDuration,
  } = option

  const isTouch = 'ontouchstart' in window

  function createRipple(e) {
    const childExceptions = elementToArray(triggerExcept, this)
    if (childExceptions.indexOf(e.target) > -1) return
    if (e.target !== this && !triggerOnChild) return

    const isStatic = styles(this, 'position').toLowerCase() === 'static'

    if (isStatic) this.style.position = 'relative'

    // Touch Events
    let eventTouches, cy, cx

    const offsetTop = offset(this).top
    const offsetLeft = offset(this).left

    // Check if the event is touch or not
    try {
      eventTouches = e.touches[1]
      cx = Math.round(e.touches[0].pageX - offsetLeft)
      cy = Math.round(e.touches[0].pageY - offsetTop)
    } catch {
      cx = e.pageX - offsetLeft
      cy = e.pageY - offsetTop
    }
    // #############
    // If multi-touch occured will not be triggerred
    if (eventTouches) return

    // Elements to append in
    const { offsetWidth, offsetHeight } = this
    const divParent = tag('div', {
      style: {
        zIndex,
        height: offsetHeight + 'px',
        width: offsetWidth + 'px',
        pointerEvents: 'none',
        borderRadius: styles(this, 'borderRadius'),
        clipPath: styles(this, 'clipPath'),
        transition: `opacity ${outDuration}ms linear`,
      },
      className: 'ripleParent__',
      appendTo: this,
    })

    tag('div', {
      appendTo: divParent,
      className: 'riple__',
      style: {
        top: cy + 'px',
        left: cx + 'px',
        opacity,
        width: width || offsetWidth * Math.PI + 'px',
        height: height || offsetWidth * Math.PI + 'px',
        background,
        animation: `ripple__ ${duration}ms ${timing} forwards`,
      },
    })

    const events = isTouch ? 'touchend touchcancel' : 'mouseleave mouseup'

    function removeRipple() {
      divParent.style.opacity = 0
      setTimeout(() => this.removeChild(divParent), outDuration) // extend the duration to maintain element animation
      edit(this).off(events, removeRipple)
    }
    edit(this).on(events, removeRipple) // Add a remove
  }
  // Check if it is Element
  const elements = elementToArray(elmnt)
  // Add the event

  const event = isTouch ? 'touchstart' : 'mousedown'

  elements.forEach((el) => {
    if (isSelfTag(el))
      return console.error(
        'Ripple is not allowed on self closing tag you need to wrap it',
      )

    edit(el).on(event, createRipple)
  })
}

ripple.utils = es
export default ripple
