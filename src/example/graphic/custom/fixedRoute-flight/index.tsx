import { useState } from "react"
import Dashboard from "./dashboard"
import Airplane from "./airplane"
import Main from "./main"

function UIComponent() {
  const [currWindow, setCurrWindow] = useState<"main" | "dashboard" | "airplane">("main")

  return (
    <div
      onKeyDown={(e) => {
        console.log(e.key)
      }}
    >
      <Main isOpen={currWindow === "main"} onClick={() => setCurrWindow("main")} />
      <Dashboard isOpen={currWindow === "dashboard"} onClick={() => setCurrWindow("dashboard")} />
      <Airplane isOpen={currWindow === "airplane"} onClick={() => setCurrWindow("airplane")} />
    </div>
  )
}

export default UIComponent
