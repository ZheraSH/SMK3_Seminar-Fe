import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { HashLink } from "react-router-hash-link"; 
const Footer = () => {

  return (
    <footer  className="bg-[#001D3D] text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
            <div className="flex">
          <img
            src="/images/SMKNLOGO1.png"
            alt="SMK Negeri 3 Pamekasan"
            className="w-10 mb-4 mr-5"
          />
          <h2 className="text-lg font-semibold w-30 ">SMK Negeri 3 Pamekasan</h2>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            Teaching Factory SMK Negeri 3 Pamekasan menghadirkan pembelajaran
            berbasis industri untuk mencetak generasi siap kerja.
          </p>
        </div>

        {/* Menu */}
        <div>
          <h3 className="text-white font-semibold mb-4">Menu</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-yellow-400 transition">
                Beranda
              </a>
            </li>
            <li>
              <a href="/tentangkami" className="hover:text-yellow-400 transition">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/berita" className="hover:text-yellow-400 transition">
                Berita
              </a>
            </li>
            <li>
            <HashLink
                smooth
                to="/#FAQ"
                className="hover:text-yellow-300 hover:underline transition-all duration-500"
              >              
                FAQ
            </HashLink>
            </li>
            <li>
            <HashLink
                smooth
                to="/#contact"
                className="hover:text-yellow-300 hover:underline transition-all duration-500"
              >              
                Hubungi
            </HashLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="block">
                Alamat: Jl. Raya Larangan Tokol, Pamekasan
              </span>
            </li>
            <li>
              <span className="block">Telepon: (0324) 32xxxx</span>
            </li>
            <li>
              <span className="block">Email: tefa@smkn3pamekasan.sch.id</span>
            </li>
          </ul>
        </div>

        {/* Media Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Media Social</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaInstagram className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                @tefa.smkn3pamekasan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaFacebook className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                @TEFASMKN3Pamekasan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter className="text-yellow-400" />
              <a href="#" className="hover:text-yellow-400 transition">
                tefa.smkn3pamekasan
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-600 mt-8 pt-4 text-center text-xs text-gray-400">
        © 2025 TEFA SMK Negeri 3 Pamekasan. Semua Hak Dilindungi.
      </div>
    </footer>
  );
};

export default Footer;
