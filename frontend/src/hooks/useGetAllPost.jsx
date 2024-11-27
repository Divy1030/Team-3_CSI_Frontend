import { useState, useEffect } from "react";
import axios from "axios";
import { refreshToken } from "../redux/authService";

const useGetAllPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllPosts = async () => {
        try {
            let token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error("No access token found");
            }

            let res = await axios.get('https://hola-project.onrender.com/api/accounts/homepage/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 401) {
                token = await refreshToken();
                res = await axios.get('https://hola-project.onrender.com/api/accounts/homepage/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }

            if (res.status === 200) {
                console.log('API Response:', res.data); // Log the response data
                setPosts(res.data.posts || []); // Ensure posts is an array
            }
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    return { posts, loading, error, fetchAllPosts };
};

export default useGetAllPost;