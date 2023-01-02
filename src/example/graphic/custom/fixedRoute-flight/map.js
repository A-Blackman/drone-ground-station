import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 24.610979, lng: 118.314397, alt: 795.8, heading: 0.8, pitch: -83.7 }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { bottom: "380px", left: "5px" }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到组件中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.toolbar.style.bottom = "55px" // 修改toolbar控件的样式

  addGraphicLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export let fixedRoute

function addGraphicLayer() {
  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const positions = [
    [118.315754, 24.609525, 418.5],
    [118.315699, 24.609754, 419.1],
    [118.315759, 24.610242, 422.2],
    [118.316109, 24.611108, 425.6],
    [118.316669, 24.612062, 428.8],
    [118.317105, 24.612978, 431.7],
    [118.317429, 24.613782, 432.2],
    [118.317829, 24.614648, 432.6],
    [118.318229, 24.615548, 432.7],
    [118.318639, 24.61646, 433.2],
    [118.319029, 24.617376, 433.8],
    [118.319369, 24.618276, 434.9],
    [118.319615, 24.619388, 438.5],
    [118.320039, 24.620338, 442.5],
    [118.320469, 24.621318, 445.5],
    [118.320904, 24.622262, 449.4],
    [118.321324, 24.623121, 454.2],
    [118.321599, 24.623975, 458.7],
    [118.321689, 24.625131, 463.9],
    [118.321579, 24.626368, 468.8],
    [118.321229, 24.627428, 473.7],
    [118.320774, 24.628442, 479.1],
    [118.320239, 24.629461, 486.1],
    [118.339729, 24.630532, 493.5],
    [118.339264, 24.631518, 500.9],
    [118.338709, 24.632543, 510],
    [118.344909, 24.635183, 1133.1],
    [118.343389, 24.634496, 1137.1],
    [118.342189, 24.633573, 1144.7],
    [118.341149, 24.632568, 1156.7],
    [118.340359, 24.631538, 1169.8],
    [118.339799, 24.630498, 1181.2],
    [118.339349, 24.629354, 1193.9],
    [118.339239, 24.628175, 1204.7],
    [118.339199, 24.627008, 1217.5],
    [118.338985, 24.625825, 1219.3],
    [118.338719, 24.624704, 1229.2],
    [118.338504, 24.623662, 1244],
    [118.338319, 24.622651, 1259.5],
    [118.338159, 24.621621, 1276.4],
    [118.338009, 24.620608, 1288.9],
    [118.337859, 24.619592, 1299.4],
    [118.337719, 24.618562, 1307.6],
    [118.337579, 24.617551, 1318.2],
    [118.337479, 24.616533, 1324.5],
    [118.337375, 24.615503, 1333.4],
    [118.337249, 24.614495, 1342.3],
    [118.337109, 24.613481, 1348.5],
    [118.336925, 24.612451, 1355.5],
    [118.336689, 24.611432, 1362.3],
    [118.336329, 24.610395, 1369.9],
    [118.335779, 24.609358, 1377.1],
    [118.334999, 24.608373, 1386.1],
    [118.334169, 24.607366, 1395.2],
    [118.333239, 24.606492, 1402.7],
    [118.332034, 24.605893, 1407.4],
    [118.330639, 24.605432, 1415.9],
    [118.329143, 24.605142, 1422.6],
    [118.327639, 24.60497, 1429.6],
    [118.326053, 24.605134, 1434.4],
    [118.324344, 24.605382, 1437.1],
    [118.322739, 24.605813, 1434.6],
    [118.321124, 24.606393, 1432.8],
    [118.319589, 24.606968, 1434.4],
    [118.318065, 24.607548, 1436.9],
    [118.318949, 24.614934, 1272.7],
    [118.319889, 24.615938, 1266.5],
    [118.320995, 24.616778, 1262],
    [118.322219, 24.617478, 1257.4],
    [118.323369, 24.618178, 1259.1],
    [118.324535, 24.618852, 1259.3],
    [118.325729, 24.61955, 1257.7],
    [118.326959, 24.620248, 1253.8],
    [118.328204, 24.620984, 1248.4],
    [118.329429, 24.621701, 1242.8],
    [118.330623, 24.622398, 1241.4],
    [118.331799, 24.623088, 1241.6],
    [118.332973, 24.623792, 1240.8],
    [118.334099, 24.624505, 1240.5],
    [118.335159, 24.625291, 1238.8],
    [118.336079, 24.626208, 1236.6],
    [118.336833, 24.627313, 1232.6],
    [118.337469, 24.628473, 1230.4],
    [118.338023, 24.629636, 1227.8],
    [118.338519, 24.630798, 1225.7],
    [118.339009, 24.631963, 1223.5],
    [118.339519, 24.633118, 1223.2],
    [118.340029, 24.634288, 1223.1],
    [118.340589, 24.635453, 1222.1],
    [118.341199, 24.636541, 1222.2],
    [118.341959, 24.637563, 1221.3],
    [118.342883, 24.63852, 1221.2],
    [118.343883, 24.639444, 1221.5]
  ]

  fixedRoute = new mars3d.graphic.FixedRoute({
    name: "飞机航线",
    speed: 100,
    startTime: "2017-08-25 09:00:00",
    positions: positions,
    // "clockLoop": true,      //是否循环播放
    clockRange: Cesium.ClockRange.CLAMPED, // CLAMPED 到达终止时间后停止
    camera: {
      type: "gs",
      heading: 30,
      radius: 500
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
      scale: 1,
      minimumPixelSize: 100
    },
    path: {
      color: "rgba(255,255,0,0.5)",
      width: 1,
      leadTime: 0
    },
    wall: {
      color: "rgba(0,255,255,0.5)",
      surface: true
    }
  })
  graphicLayer.addGraphic(fixedRoute)

  // 绑定popup
  bindPopup(fixedRoute)

  // ui面板信息展示
  fixedRoute.on(mars3d.EventType.change, (event) => {
    eventTarget.fire("roamLineChange", event)
  })

  // fixedRoute.start()
  fixedRoute.openPopup()

  // 修改控件对应的时间
  map.clock.currentTime = fixedRoute.startTime
  if (map.controls.timeline) {
    map.controls.timeline.zoomTo(fixedRoute.startTime, fixedRoute.stopTime)
  }
}

// 改变视角模式
export function updateCameraSetting(data) {
  const cameraType = data.select
  const followedX = data.followedX
  const followedZ = data.followedZ
  const offsetZ = data.offsetZ
  const offsetY = data.offsetY
  const offsetX = data.offsetX

  fixedRoute.setCameraOptions({
    type: cameraType,
    radius: cameraType === "gs" ? followedX : 0,
    followedX: followedX,
    followedZ: followedZ,
    offsetZ: offsetZ,
    offsetY: offsetY,
    offsetX: offsetX
  })
}

function bindPopup(fixedRoute) {
  fixedRoute.bindPopup(
    `<div style="width: 200px">
      <div>总 距 离：<span id="lblAllLen"> </span></div>
      <div>总 时 间：<span id="lblAllTime"> </span></div>
      <div>开始时间：<span id="lblStartTime"> </span></div>
      <div>剩余时间：<span id="lblRemainTime"> </span></div>
      <div>剩余距离：<span id="lblRemainLen"> </span></div>
    </div>`,
    { closeOnClick: false }
  )

  // 刷新局部DOM,不影响popup面板的其他控件操作
  fixedRoute.on(mars3d.EventType.postRender, function (event) {
    const container = event.container // popup对应的DOM

    const params = fixedRoute?.info
    if (!params) {
      return
    }

    const lblAllLen = container.querySelector("#lblAllLen")
    if (lblAllLen) {
      lblAllLen.innerHTML = mars3d.MeasureUtil.formatDistance(params.distance_all)
    }

    const lblAllTime = container.querySelector("#lblAllTime")
    if (lblAllTime) {
      lblAllTime.innerHTML = mars3d.Util.formatTime(params.second_all / map.clock.multiplier)
    }

    const lblStartTime = container.querySelector("#lblStartTime")
    if (lblStartTime) {
      lblStartTime.innerHTML = mars3d.Util.formatDate(Cesium.JulianDate.toDate(fixedRoute.startTime), "yyyy-M-d HH:mm:ss")
    }

    const lblRemainTime = container.querySelector("#lblRemainTime")
    if (lblRemainTime) {
      lblRemainTime.innerHTML = mars3d.Util.formatTime((params.second_all - params.second) / map.clock.multiplier)
    }

    const lblRemainLen = container.querySelector("#lblRemainLen")
    if (lblRemainLen) {
      lblRemainLen.innerHTML = mars3d.MeasureUtil.formatDistance(params.distance_all - params.distance) || "完成"
    }
  })
}

// ui层使用
export const formatDistance = mars3d.MeasureUtil.formatDistance
export const formatTime = mars3d.Util.formatTime
