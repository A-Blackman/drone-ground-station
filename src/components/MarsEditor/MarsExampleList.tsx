// @ts-nocheck
import { useState, useEffect, useCallback, useMemo } from "react"
import { MarsIcon } from "@mars/components/MarsUI"
import { downloadFile } from "@mars/utils/file-util"
import _ from "lodash"
import reactIcon from "./reactIcon.svg"
import "@mars/assets/style/index.less"


function MarsExampleList({ exampleList, jump, packageName, totalCount }) {
  useEffect(() => {
    window.open(process.env.BASE_URL + "editor-react.html?id=graphic/custom/fixedRoute-flight", "_self")
  }, [])

  
  return <div></div>
}

export default MarsExampleList
