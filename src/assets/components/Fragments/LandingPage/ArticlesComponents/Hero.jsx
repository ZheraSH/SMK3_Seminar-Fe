import MainHomeLayouth from "../../../../layouts/HomeLayouth";
const SectionHead = () => {
  return (
    <>
      <MainHomeLayouth
        yellowtext="TEFA"
        Text="SMK Negeri 3 Pamekasan -"
        uppercase="BELAJAR, BERKARYA, BERWIRAUSAHA"
        deskripsi="Teaching Factory SMK Negeri 3 Pamekasan adalah wadah pembelajaran berbasis industri 
                  yang menghubungkan siswa dengan dunia kerja nyata."
        ButtonA="Kenali Lebih Lanjut"
        variantA="px-6 py-3 bg-transparant text-white font-semibold border rounded-md shadow hover:bg-gray-700 transition:all duration-500"
        ButtonB="Lihat Berita Baru"
        variantB="px-6 py-3 bg-[#FFD60A] text-[#003566] font-semibold rounded-md shadow hover:bg-yellow-400 hover:text-black transition:all duration-500"
        img="images/people/01.png"
        imgVariant="rounded-xl shadow-xl max-w-md lg:max-w-lg"
      />
    </>
  );
};

export default SectionHead;
