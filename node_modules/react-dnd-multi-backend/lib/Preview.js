'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDnd = require('react-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Preview = (_dec = (0, _reactDnd.DragLayer)(function (monitor) {
  return {
    currentOffset: monitor.getSourceClientOffset(), isDragging: monitor.isDragging(), itemType: monitor.getItemType(), item: monitor.getItem()
  };
}), _dec(_class = (_temp = _class2 = function (_PureComponent) {
  _inherits(Preview, _PureComponent);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: 'getStyle',
    value: function getStyle() {
      var transform = 'translate(' + this.props.currentOffset.x + 'px, ' + this.props.currentOffset.y + 'px)';
      return { pointerEvents: 'none', position: 'fixed', top: 0, left: 0, transform: transform, WebkitTransform: transform };
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.context.dragDropManager.getBackend().previewEnabled() || !this.props.isDragging || this.props.currentOffset === null) {
        return null;
      }
      return this.props.generator(this.props.itemType, this.props.item, this.getStyle());
    }
  }]);

  return Preview;
}(_react.PureComponent), _class2.defaultProps = { currentOffset: { x: 0, y: 0 }, isDragging: false, itemType: '', item: {} }, _class2.propTypes = {
  currentOffset: _propTypes2.default.shape({ x: _propTypes2.default.number, y: _propTypes2.default.number }),
  isDragging: _propTypes2.default.bool, itemType: _propTypes2.default.string, item: _propTypes2.default.any, generator: _propTypes2.default.func.isRequired
}, _class2.contextTypes = { dragDropManager: _propTypes2.default.object }, _temp)) || _class);
exports.default = Preview;