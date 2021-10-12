"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayEdges = exports.TargetType = exports.dataFinder = exports.wallCreator = void 0;

var wallCreator = function wallCreator(DATA, POS) {
  return DATA.filter(POS).map(function (el) {
    return el._id;
  });
};

exports.wallCreator = wallCreator;

var dataFinder = function dataFinder(arr, finder) {
  return arr.find(finder);
};

exports.dataFinder = dataFinder;

var TargetType = function TargetType(TYPE, POS) {
  return TYPE && TYPE.split(" ")[POS].replace(/[,]/g, "");
};

exports.TargetType = TargetType;

var getArrayEdges = function getArrayEdges(arr, start, end) {
  return arr.filter(function (el) {
    return el._id >= start && el._id <= end;
  }).map(function (el) {
    return el._id;
  });
};

exports.getArrayEdges = getArrayEdges;