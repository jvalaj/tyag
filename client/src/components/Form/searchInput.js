import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { useSearch } from '../../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form role="search" className=" mx-auto max-w-screen-md" onSubmit={handleSubmit}>
                <label className="  mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer">
                        <BiSearch className="text-white" size={20} />
                    </div>
                    <input
                        value={values.keyword}
                        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                        type="search" className="
                                block transition
                                 w-full py-3 p-2 pl-10 text-sm border
                                rounded-full 
                                 bg-gray-700 border-gray-600
                                  placeholder-gray-400
                                   text-white 
                                   focus:ring-blue-500
                                    focus:border-blue-500" placeholder="Search Now" required />
                    <button type="submit" className="text-white
                                absolute transition
                                 py-3 right-[0px]
                                bottom-[0.8px] 
                                rounded-full
                                text-sm px-4
                                bg-blue-600 hover:bg-blue-700">
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchInput