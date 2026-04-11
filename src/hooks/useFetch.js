import {useState,useEffect} from "react";
import axios from "axios";

export default function useFetch(url){
 const [data,setData]=useState([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [total, setTotal] = useState(0);
    
 useEffect(()=>{
     if (!url) return;
     
  (async()=>{
     try {
       setLoading(true);
       setError(null); // reset error before fetch

       const res = await axios.get(url);

       if (res.data.items) {
         setData(res.data.items);
         setTotal(res.data.total_count); 
       } else {
         setData(res.data);
         setTotal(res.data.length);
       }
     } catch (err) {
       setError("Failed to fetch data"); 
       setData([]); 
     } finally {
       setLoading(false);
     }
  })();
     
 },[url]);
 return {data,loading,error,total};
}
