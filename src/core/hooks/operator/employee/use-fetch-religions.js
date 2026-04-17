import { useState, useEffect } from 'react';
import { fetchReligionsApi } from '@services/role-operator/employee/teachers-api';

export const useFetchReligions = () => {
  const [religions, setReligions] = useState([]);

  useEffect(() => {
    const loadReligions = async () => {
      const data = await fetchReligionsApi();
      setReligions(data);
    };
    loadReligions();
  }, []);

  return religions;
};
