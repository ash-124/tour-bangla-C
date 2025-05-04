import { useEffect, useState } from "react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const SearchInput = ({ setSelectedUsers }) => {
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState("");
    const {data:users = [], refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const {data} = await axiosPublic.get(`/users?search=${search}`) 
            return data
        }
    })
    useEffect(()=>{
        setSelectedUsers(users?.users)
        refetch();
    },[search, users])
    console.log({searchQuotes:search, searchData:users});
    return (
        <div>
            <label className="input flex items-center p-3 gap-3">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" onChange={(e)=> setSearch(e.target.value)} className="grow" placeholder="Search By Name" />
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </label>
        </div>
    );
};

export default SearchInput;