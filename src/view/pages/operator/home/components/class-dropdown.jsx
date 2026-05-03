"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Layers } from "lucide-react";
import { fetchClassrooms } from "@core/services/role-operator/dashboard/dashboard-api";

export default function ClassDropdown({ onSelect, selectedId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchClassrooms();
        if (Array.isArray(data)) {
          setClassrooms(data);
        }
      } catch (error) {
        console.error("Failed to load classrooms:", error);
      } finally {
        setLoading(false);
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedClass = classrooms.find(c => c.id === selectedId) || { name: "Semua Kelas" };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-4 py-2 text-sm border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-all min-w-[160px] shadow-sm hover:border-blue-300"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-500" />
          <span className="text-slate-700 font-medium">{selectedClass.name}</span>
        </div>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-full min-w-[200px] bg-white border border-slate-100 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => {
                onSelect(null);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-all border-b border-slate-50 ${!selectedId ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'}`}
            >
              Semua Kelas
            </button>
            
            {loading ? (
              <div className="px-4 py-3 text-xs text-slate-400 italic">Memuat kelas...</div>
            ) : classrooms.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelect(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-all ${selectedId === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-600'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
