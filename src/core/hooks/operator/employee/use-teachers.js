import { useState, useEffect } from 'react';
import { fetchTeachersApi } from '@services/role-operator/employee/teachers-api';

export const useTeachers = () => {
  const [allTeachers, setAllTeachers] = useState([]);

  const fetchTeachers = async (page = 1) => {
    const data = await fetchTeachersApi(page);
    setAllTeachers(data);
    return data;
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return { allTeachers, fetchTeachers };
};
