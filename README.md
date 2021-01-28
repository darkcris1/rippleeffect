# Ripple Effect

You can add ripple effect to your website with just single line of code

View [Demo](https://codepen.io/darkcris1/pen/zYoOWrO?editors=1010) Here

# DOCS

- [Installation](#Installation)
- [Usage](#Usage)
- [Examples](#Examples)
- [API](#api)

# Installation

NPM

```bash
npm i ripple-effects
```

Unpkg (5kb)

```html
<script src="https://unpkg.com/ripple-effects"></script>
```

Unpkg Unbabel Version (3kb) - IE Not Supported

```html
<script src="https://unpkg.com/ripple-effects"></script>
```

# Usage

```javascript
import ripple "ripple-effects";

ripple(".card");
// with option

ripple(".card",{
  background: "yellow",
  triggerExcept: "button", // BUtton children of the card will not cause a trigger to the ripple
})
```

> **NOTE** Self closing is not allowed you need to wrap it on element

# Examples

```javascript
const elements = document.querySelectorAll('.card')
ripple(elements, {
  background: 'radial-gragiend(white,black)',
  opacity: 0.4,
  triggerExcept: 'button', // BUtton children of the card will not cause a trigger to the ripple
})

const body = document.body

ripple(body, {
  background: 'white',
})

// You can also access the utilities that i use

console.log(ripple.utils)
```

# API

ripple(**element**, **option?**)

| option         | default              | type               | description                                              |
| -------------- | -------------------- | ------------------ | -------------------------------------------------------- |
| background     | rgb(150,150,150)     | string?            | change the backgroud color of the ripple                 |
| opacity        | 0.5                  | number?            | animation timing function of css                         |
| width          | width of the element | string?            | specify the width of the ripple                          |
| height         | width of the element | string?            | specify the height of the ripple                         |
| duration       | 700 (ms)             | number?            | speed of the animation                                   |
| outDuration    | 800 (ms)             | number?            | when the element will remove                             |
| zIndex         | 99                   | number?            | you can adjust the zIndex                                |
| triggerExcept  | null                 | string? \| Element | add an exception of an element to be triggered           |
| triggerOnChild | true                 | boolean?           | ripple will triggered if you click the children elements |
| timing         | base ease            | string?            | animation timing function of css                         |
