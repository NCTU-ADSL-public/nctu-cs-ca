# react-drag-and-zoom
[![npm package][npm-badge]][npm]

[Demo!](https://react-drag-and-zoom.now.sh)

## Why
If you need to make a component draggable and zoomable on scroll, this component is for you.

## Usage
```js
<DragAndZoom>
  <span>I can be zoomed and dragged</span>
</DragAndZoom>
```

## Install
```bash
yarn add react-drag-and-zoom

# Or, if using npm
npm install --save react-drag-and-zoom
```

## Props
### `zoomStep: number`
This value is used to control zooming velocity. Default is `0.7`.

### `initialZoom: number`
Initial zoom percentage. Default is `100`.

### `minZoom: number`
Minimum zoom percentage that can be applied. Default is `0`.

### `maxZoom: number`
Maximum zoom percentage that can be applied. Default is `Number.MAX_SAFE_INTEGER`.

### `onZoom: func`
Called while scrolling for zoom with the zoom value as it's first argument and the Event as the second.

### `onMouseDown: func`
Called on mouse down with the Event as its only argument.

### `onDragStart: func`
Called on drag start with the Event as its only argument.
### `onDrag: func`
Called while dragging with the Event as its only argument.

### `onDragStop: func`
Called when dragging stops with the Event as its only argument.

### `bounds: oneOf([shape({ left: number, top: number, right: number, bottom: number }), selector: string, 'parent'])`
Specifies movement boundaries. Accepted values:
- `parent` restricts movement within the node's offsetParent (nearest node with position relative or absolute).
- A selector, restricts movement within the targeted node
- An object with `left, top, right, and bottom` properties. These indicate how far in each direction the draggable can be moved.

## About Citrusbyte

![Citrusbyte](http://i.imgur.com/W6eISI3.png)

This software is lovingly maintained and funded by Citrusbyte.
At Citrusbyte, we specialize in solving difficult computer science problems for startups and the enterprise.

At Citrusbyte we believe in and support open source software.
* Check out more of our open source software at Citrusbyte Labs.
* Learn more about [our work](https://citrusbyte.com/portfolio).
* [Hire us](https://citrusbyte.com/contact) to work on your project.
* [Want to join the team?](http://careers.citrusbyte.com)

*Citrusbyte and the Citrusbyte logo are trademarks or registered trademarks of Citrusbyte, LLC.*

[npm-badge]: https://img.shields.io/npm/v/react-drag-and-zoom.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-drag-and-zoom

## License

MIT © [Citrusbyte, LLC](https://citrusbyte.com)
