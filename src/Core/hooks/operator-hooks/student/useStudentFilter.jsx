"use client";

import { useState, useEffect } from "react";
import { fetchMajors, fetchlevelclasses } from "@/Core/api/role-operator/student/StudentApi";

export const useStudentFilter = () => {
  const [category, setCategory] = useState({
    type: "",
    value: "",
    label: "Pilih Kategori",
  });
  
  const [masters, setMasters] = useState({
    majors: [],
    levelClasses: [],
    genders: [
      { value: "male", label: "Laki-laki" },
      { value: "female", label: "Perempuan" }
    ]
  });
  
  const [appliedFilters, setAppliedFilters] = useState({});

  useEffect(() => {
    const loadMasters = async () => {
      try {
        const [majorsData, levelClassesData] = await Promise.all([
          fetchMajors(),
          fetchlevelclasses(),
        ]);
        
        setMasters(prev => ({
          ...prev,
          majors: majorsData.map(m => ({ value: m.name, label: m.name })),
          levelClasses: levelClassesData.map(lc => ({ 
            value: lc.name, 
            label: lc.name 
          })),
        }));
      } catch (err) {
        console.error("Gagal load masters:", err);
      }
    };
    
    loadMasters();
  }, []);

  useEffect(() => {
    if (category.type && category.value) {
      setAppliedFilters({
        [category.type]: category.value
      });
    } else {
      setAppliedFilters({});
    }
  }, [category]);

  const resetFilter = () => {
    setCategory({
      type: "",
      value: "",
      label: "Pilih Kategori",
    });
    setAppliedFilters({});
  };

  return {
    category,
    setCategory,
    masters,
    appliedFilters,
    resetFilter,
  };
};