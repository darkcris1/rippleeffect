type element = NodeList | HTMLCollection | Element | string

interface options {
  /**
   * @default "rgb(150,150,150)"
   */
  background?: string

  /**
   * @default 99
   */
  zIndex?: number

  /**
   * @default 800
   */
  outDuration?: number

  /**
   * @default 700
   */
  duration?: number

  /**
   * @default 0.5
   */
  opacity?: number

  /**
   * You can add all the available css timing function in animation
   * @default "linear"
   * @example
   * ripple(".card",{
   *  timing: "ease-in"
   * })
   */
  timing?: string

  /**
   * You can specify the height of the ripple
   * @default "The default value is base width * MATH.PI of the element"
   *
   * @example
   * ripple(".card",{
   *  height: "500px",
   * })
   */
  height?: string
  /**
   * You can specify the width of the ripple
   * @default "The default value is base width * MATH.PI of the element"
   *
   * @example
   * ripple(".card",{
   *  width: "500px",
   * })
   */

  width?: string
  /**
   * If you click the children of that element the ripple will be triggered
   * @default true
   */
  triggerOnChild?: boolean
  /**
   * If you click the children of that element the ripple will be triggered
   * @default true
   *
   * @example
   * ripple(".card",{
   *  triggerExcept: "button"
   * })
   * // or you can speicfy the element
   * ripple(".card",{
   *  triggerExcept: document.getElementById("btn")
   * })
   */
  triggerExcept?: element
}

interface ripple {
  (elmnt: element, options?: options): void
  utils: {
    tag: (tag: string | HTMLElement, options?: object) => Node
    styles: (element: HTMLElement, options?: object | string) => Node
    edit: (element: HTMLElement, options?: object) => any
  }
}

/**
 * Ripple effect with one line of code
 * @example
 * ripple(".card");
 * //or
 * ripple(document.querySelectorAll(".card"))
 * // with options
 * ripple(".card",{
 *  background: "green",
 *  opacity: 0.4
 * })
 */
declare const ripple: ripple

export default ripple
