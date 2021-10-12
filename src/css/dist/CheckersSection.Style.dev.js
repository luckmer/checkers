"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Div = exports.CheckersSection = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 75px;\n  width: 75px;\n  background-color: ", ";\n  background-image: url(", ");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 60%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: #1e2028;\n  position: absolute;\n  display: flex;\n  flex-flow: row wrap;\n  top: 47%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  height: 610px;\n  width: 610px;\n  width: auto;\n  height: auto;\n  margin: auto;\n  display: grid;\n  grid-gap: 0;\n  grid-template-columns: repeat(8, 75px);\n  grid-template-rows: repeat(8, 75px);\n  grid-auto-flow: row;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CheckersSection = _styledComponents["default"].main(_templateObject());

exports.CheckersSection = CheckersSection;

var Div = _styledComponents["default"].div(_templateObject2(), function (_ref) {
  var Design = _ref.Design;
  return Design === 1 ? "#759652" : "#EBEBD0";
}, function (_ref2) {
  var IMG = _ref2.IMG;
  return IMG !== "Empty" ? IMG : "";
});

exports.Div = Div;