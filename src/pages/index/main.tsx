import React, { useEffect } from "react"
import { createRoot } from "react-dom/client"
import "@mars/assets/style/index.less"
import "./index.less"

const App = () => {
  useEffect(() => {
    window.open(process.env.BASE_URL + "editor-react.html?id=graphic/custom/fixedRoute-flight", "_self")
  }, [])

  return <></>
}

const reactApp = createRoot(document.getElementById("root"))
reactApp.render(<App />)
