import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const auth = useAuth();

    const [userProfile, setUserProfile] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("UserContext - useEffect: ", auth.currentUser); // debugging
        if (auth?.currentUser) {
            setUserProfile(auth?.currentUser)
        } else {
            setUserProfile(null);
        }
    }, [auth?.currentUser])
    
    const updateProfile = async(updateInfo) => {
        setLoading(true);
        try {
            const response = await api.put("/user/update", updateInfo);
            setUserProfile(response.data);

            await auth.checkAuthStatus();

            return response.data;

        } catch (error) {
            console.log("Failed to update profile" + error);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        userProfile,
        loading,
        error,
        updateProfile,
        setError
    };

    return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};