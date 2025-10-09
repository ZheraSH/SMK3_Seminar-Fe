import { useEffect, useState } from "react";
import api from "../../../api/index.js";

function Appp() {
  const [status, setStatus] = useState("Mengecek koneksi...");

  useEffect(() => {
    api.get("/nando")
      .then((res) => {
        setStatus(res.data.message);
      })
      .catch(() => {
        setStatus("❌ Backend tidak terhubung");
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Status Koneksi</h1>
      <p className="mb-6">{status}</p>
    </div>
  );
}

export default Appp;
