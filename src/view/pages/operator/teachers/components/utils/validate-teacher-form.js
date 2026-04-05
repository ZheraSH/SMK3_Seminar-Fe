export const validateTeacherForm = (post, editingId) => {
    const newErrors = {};
  
    if (!post.name) newErrors.name = ["Nama wajib diisi."];
    if (!post.email && !editingId) newErrors.email = ["Email wajib diisi."];
    if (!post.gender) newErrors.gender = ["Jenis kelamin wajib dipilih."];
    if (!post.nik) newErrors.nik = ["NIK wajib diisi."];
    if (!post.nip) newErrors.nip = ["NIP wajib diisi."];
    if (!post.birth_place)
      newErrors.birth_place = ["Tempat lahir wajib diisi."];
    if (!post.birth_date) newErrors.birth_date = ["Tanggal lahir wajib diisi."];
    if (!post.phone_number)
      newErrors.phone_number = ["Nomer telepon wajib diisi."];
    if (!post.address) newErrors.address = ["Alamat wajib diisi."];
    if (!post.religion_id) newErrors.religion_id = ["Agama wajib dipilih."];
    if (!post.roles || post.roles.length === 0)
      newErrors.roles = ["Role wajib dipilih."];
  
    return newErrors;
  };
  