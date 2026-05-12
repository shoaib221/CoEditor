import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
} from "react";
import { auth } from "./firebase.config";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const baseURL = "http://localhost:4000";
// export const baseURL = "https://express-practice-xbf9.onrender.com";

const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

const axiosFormData = axios.create({
    baseURL,
    headers: { "Content-Type": "multipart/form-data" },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const interceptors = useRef({ req: null, res: null });

    const LogOut = async () => {
        await signOut(auth);
        setUser(null);
        navigate("/auth");
    };

    const setupInterceptors = (firebaseUser) => {
        if (interceptors.current.req) {
            axiosInstance.interceptors.request.eject(interceptors.current.req);
            axiosInstance.interceptors.response.eject(interceptors.current.res);
        }

        interceptors.current.req = axiosInstance.interceptors.request.use(
            async (config) => {
                if (firebaseUser) {
                    const token = await firebaseUser.getIdToken(true); // 🔥 FIX
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            }
        );

        interceptors.current.res = axiosInstance.interceptors.response.use(
            (res) => res,
            (err) => {
                if ([401, 403].includes(err.response?.status)) {
                    LogOut();
                }
                return Promise.reject(err);
            }
        );

        axiosFormData.interceptors.request.use(async (config) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken(true);
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        });
    };

    const handleUserLogin = async (firebaseUser) => {
        if (!firebaseUser) {
            setUser(null);
            setLoading(false);
            return;
        }

        console.log( "firebaseuser", firebaseUser )

        setupInterceptors(firebaseUser);

        try {
            const token = await firebaseUser.getIdToken(true);

            const res = await axiosInstance.post("/auth/fb-register", firebaseUser);

            const fullUser = { ...firebaseUser, ...res.data.user }; 
            setUser(fullUser);
        } catch (err) {
            toast.error("Authentication failed");
            console.dir(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, handleUserLogin);
        return () => unsub();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, LogOut, axiosInstance, axiosFormData }}
        >
            {children}
        </AuthContext.Provider>
    );
};