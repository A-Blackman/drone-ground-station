interface Props {
  isOpen: boolean
  onClick: () => void
}

export default function Airplane({ isOpen = false, onClick }: Props) {
  return (
    <div
      className={`fixed border-2 bg-blue-500 cursor-pointer
  ${isOpen ? "w-screen h-screen top-0 z-40" : "h-64 w-64 top-64 right-0 z-50"}`}
      onClick={onClick}
    >
      Airplane
    </div>
  )
}
