import { useState } from "react"
import { AttitudeIndicator } from "react-typescript-flight-indicators"

interface Props {
  isOpen: boolean
  onClick: () => void
}

export default function Airplane({ onClick, isOpen = false }: Props) {
  const [rollAngle, setRollAngle] = useState(0)

  return (
    <div
      className={`fixed cursor-pointer bg-black
  ${isOpen ? "w-screen h-screen top-0 z-40 flex items-center justify-center" : "bg-transparent top-0 right-0 z-50 w-64 h-64"}`}
      onClick={onClick}
    >
      <AttitudeIndicator size={isOpen ? 800 : 200} roll={(Math.random() - 0.5) * 120} pitch={(Math.random() - 0.5) * 40} showBox={false} />
    </div>
  )
}
