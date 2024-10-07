import Image from "next/image"
import logo from '@/app/public/images/logo-qodr.svg'
const Header = () => {
  return (
    <header className="flex items-center space-x-2 w-full p-3 h-[70px] border-b-2 border-slate-300 bg-black text-white">
      <Image alt="Qodr Logo" src={logo} width={70} height={100}/>
      <h1 className="text-2xl font-bold">PPTI QODR</h1>
    </header>
  )
}

export default Header
