import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <div>


            <form onSubmit={handleSubmit}>
                <div className=' flex gap-2'><input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name=""
                    id=""
                    className=" sm:text-sm rounded-lg block w-full p-2.5 border border-gray-600 placeholder-gray-900 text-black "
                    placeholder="Enter a new Category"
                    required />
                    <button type="submit"
                        className="
                     
                     bg-gray-700
                      font-medium 
                      rounded-lg
                       text-sm
                        px-5 
                        py-2.5 
                        text-center

                         hover:bg-gray-600 border
                          border-gray-600
                          text-white">Add</button>


                </div>
            </form>

        </div>
    )
}

export default CategoryForm