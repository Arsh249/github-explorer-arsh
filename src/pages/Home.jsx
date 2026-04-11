import {useState} from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Empty from "../components/Empty";

export default function Home({setSelectedUser}){
 const [query,setQuery]=useState("");
 const [page,setPage]=useState(1);
 const debounced=useDebounce(query);

 const {data,loading,error,total}=useFetch(
  debounced?`https://api.github.com/search/users?q=${debounced}&page=${page}&per_page=10`:null
 );
    
 const totalPages = Math.ceil(Math.min(total, 1000) / 10);

    return <div className="container">
        <div className="search-wrapper">
            <input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Github Users"/>
        </div>
  
        {loading && <Loader />}

        {!loading && error && <Error message={error} />}

        {!loading && !error && debounced && data.length === 0 && <Empty />}

        <div className="grid">
            {data.map(u=><UserCard key={u.id} user={u} onClick={setSelectedUser}/>)}
        </div>

        {debounced && (
            <div className="pagination">
                {/* Prev button */}
                <button
                    className="page-btn"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    ← Prev
                </button>

                {/* Page number display */}
                <span className="page-indicator">
                    Page {page} / {totalPages}
                </span>

                {/* Next button */}
                <button
                    className="page-btn"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                >
                    Next →
                </button>
            </div>
        )}
 </div>
}
