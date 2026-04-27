export const validateTeacherForm = (post, editingId) => {
  const newErrors = {};

  if (!post.name) newErrors.name = ["Nama wajib diisi."];
  if (!post.email && !editingId) newErrors.email = ["Email wajib diisi."];
  if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
  
  if (!post.nik) {
    newErrors.nik = ["NIK wajib diisi."];
  } else if (post.nik.toString().length !== 16) {
    newErrors.nik = ["NIK harus 16 digit."];
  }

  if (!post.nip) {
    newErrors.nip = ["NIP wajib diisi."];
  } else if (post.nip.toString().length !== 18) {
    newErrors.nip = ["NIP harus 18 digit."];
  }

  if (!post.birth_place) newErrors.birth_place = ["Tempat lahir wajib diisi."];
  if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
  
  if (!post.phone_number) {
    newErrors.phone_number = ["Nomer telepon wajib diisi."];
  } else if (post.phone_number.toString().length < 12 || post.phone_number.toString().length > 15) {
    newErrors.phone_number = ["Nomor telepon harus antara 12 dan 15 digit."];
  }

  if (!post.address) newErrors.address = ["Alamat wajib diisi."];
  if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
  if (!post.roles || post.roles.length === 0)
    newErrors.roles = ["Role wajib dipilih."];

  return newErrors;
};


