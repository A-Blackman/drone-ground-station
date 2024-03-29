import * as mapWork from "./map.js"
import { MarsButton, MarsGui, MarsPannel } from "@mars/components/MarsUI"
import { Space } from "antd"
import type { GuiItem } from "@mars/components/MarsUI"
import { useState } from "react"

interface Props {
  isOpen: boolean
  onClick: () => void
}

export default function Main({ onClick, isOpen = false }: Props) {
  const [angle, setAngle] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [isPause, setPause] = useState(false)

  const options: GuiItem[] = [
    {
      type: "select",
      field: "select",
      label: "漫游视角",
      value: "gs",
      options: [
        {
          value: "",
          label: "自由视角"
        },
        {
          value: "gs",
          label: "跟随视角"
        },
        {
          value: "dy",
          label: "锁定第一视角"
        },
        {
          value: "sd",
          label: "锁定上帝视角"
        }
      ],
      change(value, data) {
        changeSelect(data)
      }
    },
    {
      type: "number",
      field: "followedX",
      label: "视角距离:",
      step: 1,
      value: 50,
      show(data) {
        return data.select === "gs" || data.select === "dy"
      },
      change(followedX, data) {
        mapWork.updateCameraSetting(data)
      }
    },
    {
      type: "number",
      field: "followedZ",
      label: "视角高度:",
      step: 1,
      value: 0,
      show(data) {
        return data.select === "sd" || data.select === "dy"
      },
      change(followedZ, data) {
        mapWork.updateCameraSetting(data)
      }
    },
    {
      type: "number",
      field: "offsetZ",
      label: "高度偏移值:",
      step: 1,
      value: 0,
      show(data) {
        return data.select === "dy"
      },
      change(offsetZ, data) {
        mapWork.updateCameraSetting(data)
      }
    },
    {
      type: "number",
      field: "offsetY",
      label: "横向偏移值:",
      step: 1,
      value: 0,
      show(data) {
        return data.select === "dy"
      },
      change(offsetY, data) {
        mapWork.updateCameraSetting(data)
      }
    },
    {
      type: "number",
      field: "offsetX",
      label: "前后偏移值:",
      step: 1,
      value: 0,
      show(data) {
        return data.select === "dy"
      },
      change(offsetX, data) {
        mapWork.updateCameraSetting(data)
      }
    },
    {
      type: "switch",
      field: "isHand",
      label: "模型角度",
      value: false,
      change(value) {
        setAngle(value)
      }
    },
    {
      type: "slider",
      field: "slidePitchStep",
      label: "pitch值(前后):",
      step: 0.01,
      min: 0,
      max: 360,
      value: 0,
      show(data) {
        return data.isHand
      },
      change(slidePitchStep, data) {
        mapWork.fixedRoute.model.setStyle({
          noPitchRoll: true, // 不使用路线自动的角度
          pitch: Number(slidePitchStep)
        })
      }
    },
    {
      type: "slider",
      field: "slideRollStep",
      label: "roll值(左右):",
      step: 0.01,
      min: 0,
      max: 360,
      value: 0,
      show(data) {
        return data.isHand
      },
      change(slideRollStep, data) {
        mapWork.fixedRoute.model.setStyle({
          noPitchRoll: true, // 不使用路线自动的角度
          roll: Number(slideRollStep)
        })
      }
    }
  ]

  // 启动漫游
  const btnStart = () => {
    mapWork.fixedRoute.start() // 启动漫游
    udpateState()
  }

  // 暂停漫游
  const btnPause = () => {
    mapWork.fixedRoute.pause()
    udpateState()
  }

  // 继续漫游
  const btnProceed = () => {
    mapWork.fixedRoute.proceed()
    udpateState()
  }

  // 停止漫游
  const btnStop = () => {
    mapWork.fixedRoute.stop()
    udpateState()
  }

  const udpateState = () => {
    setTimeout(() => {
      setIsStart(mapWork.fixedRoute.isStart)
      setPause(mapWork.fixedRoute.isPause)
    }, 100)
  }

  const changeSelect = (data: any) => {
    let params: any = {}
    switch (data.select) {
      case "gs": //
        params = data
        break
      case "dy": // 锁定第一视角
        params = {
          followedX: 200,
          followedZ: 50,
          offsetZ: 0,
          offsetY: 0,
          offsetX: 0,
          select: data.select
        }
        break
      case "sd": {
        // 锁定上帝视角
        if (data.followedZ < 500) {
          params = {
            followedX: data.followedX,
            followedZ: 500,
            offsetZ: data.offsetZ,
            offsetY: data.offsetY,
            offsetX: data.offsetX,
            select: data.select
          }
        } else {
          params = data
        }
        break
      }
      default:
        break
    }
    mapWork.updateCameraSetting(params)
  }

  return (
    <div onClick={onClick} className={`${isOpen ? "" : "h-64 w-64 top-0 right-0 z-50"}`}>
      <MarsPannel visible={true} width={280} left={10} top={10}>
        <div className="f-mb f-tac">
          {!isStart ? (
            <MarsButton onClick={btnStart}>开始</MarsButton>
          ) : (
            <Space>
              {!isPause ? <MarsButton onClick={btnPause}>暂停</MarsButton> : <MarsButton onClick={btnProceed}>继续</MarsButton>}
              <MarsButton onClick={btnStop}>停止</MarsButton>
            </Space>
          )}
        </div>

        <MarsGui
          options={options}
          formProps={{
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }}
        ></MarsGui>

        {angle ? (
          <Space>
            <span>heading值:</span>
            <span>根据路线自动计算</span>
          </Space>
        ) : (
          ""
        )}
      </MarsPannel>
    </div>
  )
}
