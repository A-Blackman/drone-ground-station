/**
 * Mars3D三维可视化平台  mars3d
 *
 * 版本信息：v3.4.9
 * 编译日期：2022-10-09 09:17:47
 * 版权所有：Copyright by 火星科技  http://mars3d.cn
 * 使用单位：免费公开版 ，2022-06-01
 */
(function (global, factory) {  if(typeof exports === 'object' && typeof module !== 'undefined' && !window.Cesium){ require('mars3d-cesium/Build/Cesium/Widgets/widgets.css') };
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, (window.Cesium || require('mars3d-cesium')), (window.turf || require('@turf/turf'))) :
  typeof define === 'function' && define.amd ? define(['exports', 'mars3d-cesium', '@turf/turf'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.mars3d = {}, global.Cesium, global.turf));
})(this, (function (exports, Cesium, turf) { 
}));