// @ts-nocheck
import { useState, useEffect, useCallback, useMemo } from "react"
import { MarsIcon } from "@mars/components/MarsUI"
import { downloadFile } from "@mars/utils/file-util"
import _ from "lodash"
import reactIcon from "./reactIcon.svg"
import "@mars/assets/style/index.less"

function getAllName(packageName, examples_list) {
  let arrNew = packageName + "功能清单："
  const qianzhui = "1."
  examples_list.forEach((item, index1) => {
    if (!item.children) {
      return
    }
    arrNew += `\n\n${qianzhui}${index1 + 1}  ${item.name}`

    item.children.forEach((item2, index2) => {
      if (!item2.children) {
        return
      }
      arrNew += `\n${qianzhui}${index1 + 1}.${index2 + 1}  ${item2.name}\n`

      item2.children.forEach((item3, index3) => {
        if (index3 === 0) {
          arrNew += `\t${item3.name}`
        } else {
          arrNew += `,${item3.name}`
        }
      })
      arrNew += "\n"
    })
  })
  return arrNew
}

function getVerDiff(examples_list) {
  let index = 0
  let arrNew = "序号,分类,子分类,功能名称,更新时间\n"

  examples_list.forEach((item) => {
    if (!item.children) {
      return
    }
    item.children.forEach((item2) => {
      if (!item2.children) {
        return
      }
      item2.children.forEach((item3) => {
        arrNew += `${++index},${item.name},${item2.name},${item3.name},${item3.date}\n`
      })
    })
  })

  return arrNew
}

const show = () => {
  const side2 = document.querySelectorAll(".sidebar-2")
  const side1Item = document.querySelectorAll(".side1-item")
  const p = document.querySelectorAll(".sidebar-1 p")
  const side2Item = document.querySelectorAll(".side2-item")
  const a = document.querySelectorAll(".a")

  for (let i = 0; i < side1Item.length; i++) {
    side1Item[i].onclick = function () {
      for (let j = 0; j < side1Item.length; j++) {
        if (i === j) {
          /* side2[j].style.display='block' */
          side1Item[j].classList.add("active1")
          side1Item[j].classList.add("active3")
          p[j].classList.add("active3")
          const x = side2[i].style.display
          if (x !== "block") {
            side2[j].style.display = "block"
          } else {
            side2[j].style.display = "none"
          }
        } else {
          side2[j].style.display = "none"
          side1Item[j].classList.remove("active1")
          side1Item[j].classList.remove("active3")
          p[j].classList.remove("active3")
        }
      }
    }
  }
  for (let i = 0; i < side2Item.length; i++) {
    side2Item[i].onclick = function () {
      for (let j = 0; j < side2Item.length; j++) {
        if (i === j) {
          side2Item[j].classList.add("active2")
          a[j].style.color = "#f08519"
          a[j].style.opacity = 1.0
        } else {
          side2Item[j].classList.remove("active2")
          a[j].style.color = "#FFFFFF"
          a[j].style.opacity = 0.6
        }
      }
    }
  }
}

function MarsExampleList({ exampleList, jump, packageName, totalCount }) {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    show()
  }, [exampleList])

  const searchList = useMemo(() => {
    const newList = _.cloneDeep(exampleList)
    newList.forEach((item) => {
      if (item.children) {
        const childrenList = []
        item.children.forEach((ite) => {
          if (ite.children) {
            const lis = []
            ite.children.forEach((itemes) => {
              if (itemes.name.search(inputValue) !== -1) {
                lis.push(itemes)
              }
            })
            ite.children = lis
          }
          if (ite.children.length !== 0) {
            childrenList.push(ite)
          }
        })
        item.children = childrenList
      }
    })

    return newList
  }, [inputValue, exampleList])

  const searchText = useCallback(
    (e) => {
      setInputValue(e.target.value)
    },
    [setInputValue]
  )

  return (
    <div className="page-wrap">
      <div className="page-box">
        {/* 侧边栏 */}
        <div className="sidebar">
          {exampleList.map((item, index) => (
            <div className="sidebar-1" key={index}>
              <div className="side1-item">
                <i className={"fa" || item.icon}></i>
                <p className="name">
                  {item.name}
                </p>
                <MarsIcon icon="right" size="24" fill="#fff"></MarsIcon>
              </div>
              <div className="sidebar-2">
                {item.children.map((item, index) => (
                  <div className="side2-item" key={index}>
                    <span>·</span>
                    <a className="a" href={"#" + item.id}>
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 主体 */}
        <div className="contain">
          {/* 示例 */}
          {searchList.map((item, index) => (
            <div style={{ display: item.children.length !== 0 ? "block" : "none" }} className="big" key={index}>
              {/* 创建三维场景 */}
              {item.children.map((item1, index) => (
                <div className="three" id={item1.id} key={item1.id}>
                  <ul>
                    {item1.children.map(
                      (item2, index) =>
                        item2.hidden !== true && (
                          <li key={item2.id} onClick={() => jump && jump(item2)}>
                            {/* <span title="这是最近新加的功能">新</span> */}
                            <div className="pic">
                              <img src={item2.thumbnail} alt="" />
                            </div>
                            <p>
                              {item2.name}
                              {item2.hasPannel === true && (
                                <span className="iconPic">
                                  <img src={reactIcon} alt="react"></img>
                                </span>
                              )}
                              {item2.plugins && <span>[{item2.plugins}插件]</span>}
                            </p>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarsExampleList
