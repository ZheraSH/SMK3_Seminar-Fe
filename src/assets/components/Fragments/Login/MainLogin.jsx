import { useState } from "react";
import { loginUser } from "../../../../api/auth";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const handleLoginn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);

      setShowNotif(true);

      setTimeout(() => {
        setShowNotif(false);
        window.location.href = "/side"; 
      }, 2000);
    } catch {
      setError("Email atau password salah.");
    }
  };

  return (
    <>
      {/* 🔹 Notifikasi Sukses */}
      {showNotif && (
        <div className="fixed top-5 right-5 bg-green-500/90 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 animate-slide-in">
          <CheckCircle size={20} className="text-white" />
          <span>Login Berhasil!</span>
        </div>
      )}

      <div className="relative flex justify-center items-center min-h-screen w-full bg-gray-100 overflow-hidden">
        {/* Bubble Background - Durasi Animasi Diperpanjang */}
        <div className="absolute inset-0">
          <div className="bubble absolute w-56 h-56 rounded-full opacity-30 blur-lg 
            bg-gradient-to-br from-cyan-300 via-cyan-400 to-teal-600 top-0 left-0 animate-[bubble1_24s_ease-in-out_infinite_alternate]"></div>
          
          <div className="bubble absolute w-64 h-64 rounded-full opacity-30 blur-lg 
            bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 top-1/4 right-0 animate-[bubble2_28s_ease-in-out_infinite_alternate-reverse]"></div>
            
          <div className="bubble absolute w-60 h-60 rounded-full opacity-30 blur-lg 
            bg-gradient-to-br from-orange-300 via-orange-400 to-yellow-500 bottom-0 left-1/2 animate-[bubble3_20s_linear_infinite_alternate]"></div>
            
          <div className="bubble absolute w-56 h-56 rounded-full opacity-30 blur-lg 
            bg-gradient-to-br from-green-300 via-green-400 to-emerald-600 bottom-1/4 left-0 animate-[bubble4_32s_ease-in-out_infinite_alternate]"></div>
            
          <div className="bubble absolute w-64 h-64 rounded-full opacity-30 blur-lg 
            bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-700 top-0 right-1/4 animate-[bubble5_22s_linear_infinite_alternate-reverse]"></div>
        </div>

        {/* Card Login */}
        <div className="flex backdrop-blur-md rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full mx-4 relative z-10 border border-white/40">
          {/* Gambar kiri */}
          <div className="py-6 hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-[#0095FF]/100 via-[#62BDFF]/100 to-[#8BCFFF]/100 backdrop-blur-md rounded-tr-[40%]">
            <img src="/images/ppl/07.png" alt="Ilustrasi Seminar" className="w-6xl" />
          </div>

          {/* Form kanan */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
            <h2 className="text-4xl text-center font-semibold mb-2 text-black drop-shadow pb-14">
              Selamat Datang di <span className="text-blue-500">Seminar</span>
            </h2>
            <form onSubmit={handleLoginn} className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-black text-sm mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white/40 border border-white/50 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
                  placeholder="Masukkan email"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              <div className="mb-2">
                <label className="block text-black text-sm mb-1">Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 rounded-lg bg-white/40 border border-white/50 
                      focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500 pr-10"
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-500 hover:text-gray-900 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-br from-[#0077B6] via-[#2490C9] to-[#3EA2D6] 
                  hover:bg-blue-600 text-white py-2 rounded-lg transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Keyframes tidak diubah, hanya durasi di atas yang diubah */}
        <style>{`
          /* Keyframes Notifikasi */
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.4s ease forwards;
          }

          /* KEYFRAMES BUBBLE */
          @keyframes bubble1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(30vw, -40vh) scale(1.1); }
            50% { transform: translate(-20vw, 30vh) scale(0.95); }
            75% { transform: translate(15vw, 10vh) scale(1.05); }
          }
          @keyframes bubble2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            30% { transform: translate(-40vw, 25vh) scale(1.15); }
            60% { transform: translate(10vw, -35vh) scale(0.9); }
            90% { transform: translate(-5vw, 20vh) scale(1.02); }
          }
          @keyframes bubble3 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              40% { transform: translate(35vw, -15vh) scale(0.98); }
              80% { transform: translate(-25vw, 30vh) scale(1.08); }
          }
          @keyframes bubble4 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              35% { transform: translate(-20vw, -30vh) scale(1.05); }
              70% { transform: translate(25vw, 25vh) scale(0.95); }
          }
          @keyframes bubble5 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              20% { transform: translate(15vw, 30vh) scale(1.1); }
              55% { transform: translate(-40vw, -15vh) scale(0.9); }
          }
        `}</style>
      </div>
    </>
  );
}