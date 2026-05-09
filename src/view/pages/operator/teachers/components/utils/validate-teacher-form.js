export const validateTeacherForm = (post, editingId) => {
  const newErrors = {};

  if (!post.name) {
    newErrors.name = ["Kolom Nama wajib diisi."];
  } else if (post.name.length > 255) {
    newErrors.name = ["Nama terlalu panjang, maksimal 255 karakter."];
  }

  if (!post.email && !editingId) {
    newErrors.email = ["Email wajib diisi."];
  }

  if (!post.gender) {
    newErrors.gender = ["Kolom Jenis Kelamin wajib diisi."];
  }

  if (post.nik && post.nik.toString().length > 16) {
    newErrors.nik = ["NIK terlalu panjang, maksimal 16 digit."];
  }

  if (!post.nip) {
    newErrors.nip = ["Kolom NIP wajib diisi."];
  } else if (post.nip.toString().length > 18) {
    newErrors.nip = ["NIP terlalu panjang, maksimal 18 karakter."];
  }

  if (!post.birth_place) {
    newErrors.birth_place = ["Kolom Tempat Lahir wajib diisi."];
  } else if (post.birth_place.length > 255) {
    newErrors.birth_place = ["Tempat Lahir terlalu panjang, maksimal 255 karakter."];
  }

  if (!post.birth_date) {
    newErrors.birth_date = ["Kolom Tanggal Lahir wajib diisi."];
  }

  if (post.phone_number && post.phone_number.toString().length > 20) {
    newErrors.phone_number = ["Nomor HP terlalu panjang, maksimal 20 karakter."];
  }

  if (!post.address) {
    newErrors.address = ["Kolom Alamat wajib diisi."];
  } else if (post.address.length > 500) {
    newErrors.address = ["Alamat terlalu panjang, maksimal 500 karakter."];
  }

  if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];

  if (!post.roles || post.roles.length === 0) {
    newErrors.roles = ["Role wajib dipilih."];
  }

  return newErrors;
};


