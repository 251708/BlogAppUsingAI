/*

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({children}) => {
    
    const navigate = useNavigate()
    const[blog,setBlogs] = useState([])
    const[input,setInput] = useState("")
      const [token, setToken] = useState("");

    const fetchBlogs = async () =>  {
        try {
    const {data} =  await axios.get('/api/blog/all'); 
       data.success ? setBlogs(data.blogs)  : toast.error(data.message)
        } catch (error) {
          toast.error(error.message)  
        }
    }

    useEffect(() => {
      fetchBlogs();
      const token = localStorage.getItem('token')
      if(token) {
        setToken();
        axios.defaults.headers.common['Authorization'] = `${token}`;
      }
    },[])

    const value = {
        axios , navigate,token , setToken, blog,setBlogs,input,setInput
    }

    return( 
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
};

*/


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);   // ✅ renamed to blogs
  const [input, setInput] = useState("");
  const [token, setToken] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
        console.log("Fetched blogs:", data.blogs); // ✅ debug log
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);   // ✅ fixed: pass token
      axios.defaults.headers.common["Authorization"] = `${savedToken}`;
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,      // ✅ plural
    setBlogs,
    input,
    setInput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
