import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <img src="/images/404.png" alt="Not Found" className="w-[30%] h-auto mb-6" />
      <h1 className="text-[51px] font-bold mb-3">Page Has Not Found</h1>
    </div>
  )
}
