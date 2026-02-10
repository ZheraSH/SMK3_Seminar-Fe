import { useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const newsData = [
  {
    id: 1,
    title: "Judul Berita 1",
    category: "Kegiatan Siswa",
    image: "/images/people/06.png",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi unde, repellat facere fugiat eos libero harum consequatur ipsa ducimus vero aliquam, voluptatum magnam architecto nemo debitis. Eos consequuntur, asperiores tempora rem iure doloribus laudantium veniam tempore facilis, sequi fuga magni sed aperiam, minima eius corrupti sint voluptatibus ducimus voluptates odio nesciunt beatae maiores fugit deleniti! Corporis reiciendis culpa corrupti neque voluptatum temporibus. Quidem aut accusamus aperiam tenetur odio commodi suscipit in maiores debitis nam, quos non dolorum excepturi, totam asperiores. Eveniet quo quis veritatis vel minima aperiam adipisci ullam rem nostrum? Incidunt sit molestiae voluptas doloremque magni necessitatibus eveniet non?",
  },
  {
    id: 2,
    title: "Judul Berita 2",
    category: "Inovasi Produk",
    image: "/images/ppl/05.png",
    content:
      "Suspendisse potenti. Proin tristique lorem sit amet elit efficitur, at convallis orci egestas...",
  },
  {
    id: 3,
    title: "Judul Berita 3",
    category: "Pengumuman",
    image: "/images/ppl/01.png",
    content:
      "Praesent feugiat est nec dui hendrerit, sit amet fermentum mauris aliquet...",
  },
];

const categories = ["Semua", "Kegiatan Siswa", "Inovasi Produk", "Pengumuman"];

const NewsSection = () => {
  useEffect(() => {
    Aos.init({});
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredNews =
    selectedCategory === "Semua"
      ? newsData
      : newsData.filter((n) => n.category === selectedCategory);

  const mainNews = filteredNews[0]; 
  const otherNews = filteredNews.slice(1); 

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="3000"
      className="max-w-7xl mx-auto my-30 px-6 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2">
        {mainNews && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                {mainNews.title}
              </h3>
              <p className="text-gray-600 mb-4">{mainNews.content}</p>
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Baca Selengkapnya →
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-bold text-blue-700 mb-3">
            Berita Lainnya
          </h4>
          <div className="space-y-4">
            {otherNews.map((news) => (
              <div
                key={news.id}
                className="flex items-center gap-4 bg-white p-3 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-20 h-16 object-cover rounded-md"
                />
                <div>
                  <h5 className="font-semibold text-gray-800 text-sm">
                    {news.title}
                  </h5>
                  <p className="text-xs text-gray-500">{news.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-blue-700 mb-3">
            Kategori Lainnya
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm rounded-lg border ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                } transition`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
