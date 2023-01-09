interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export default function Airplane({ onClick, isOpen = false }: Props) {
  return <div className={`fixed border-2 bg-red-500 cursor-pointer
  ${isOpen ? "w-screen h-screen top-0 z-40" : "top-0 right-0 z-50 w-64 h-64"}`}
    onClick={onClick}
  >
    Dashboard
  </div>
}
