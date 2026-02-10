import { getProfile,updatePhoto,updateEmail,updatePassword } from "../../../api/profile";
import { useState,useEffect } from "react";

export default function fetchProfile () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);

    const token = localStorage.getItem("token"); 

    const profile = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getProfile ();

            if(!data?.data) {
                setError("Gagal memuat data profile ");
                setLoading(false);
            }
            setData(data)
            
        }
        catch (error) {
            console.error(error);
            setError("Terjadi Kesalahan Saat Memuat Data.");
        } finally {
            setLoading(false);
        }
    };

    const updateUserPhoto = async (file) => {
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('photo', file); 

        try {
            const res = await updatePhoto(formData, token);
            await profile(); 
            return res;
        } catch (err) {
            console.error("Upload Foto Error:", err);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    const updateUserEmail = async (email) => {
        setIsUpdating(true);
        const formData = new FormData();
        formData.append('email', email);

        try {
            const res = await updateEmail(formData, token);
            await profile();
            return res;
        } catch (err) {
            console.error("Update Email Error:", err);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    const updateUserPassword = async (passwordPayload) => {
        setIsUpdating(true);
        try {
            const res = await updatePassword(passwordPayload, token);
            return res;
        } catch (err) {
            console.error("Update Password Error:", err);
            throw err;
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        profile();
    }, []);

    return {
        data, 
        loading, 
        error, 
        updateUserPhoto, 
        updateUserEmail, 
        updateUserPassword, 
        isUpdating, 
        profile
    };
}