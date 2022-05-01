import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Allinventories from '../Allinventories/Allinventories';

const ManageItems = () => {
    const [pageCount, setPageCount] = useState(0);
    const [pageNo, setPageNo] = useState(0);
    const navigate = useNavigate();

    const [inventories, setInventories] = useState([])
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:5000/items?pageNo=${pageNo}`)
            setInventories(data)
        })()
    }, [pageNo])

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:5000/items/total')
            setPageCount(Math.ceil(data.total / 4))
        })()
    }, [])

    const handleDelete = async (id) => {
        (async () => {
            await axios.delete(`http://localhost:5000/items/${id}`)
                .then(data => {
                    const confirmation = window.confirm("Are you sure to delete this Inventory?")
                    if (confirmation) {
                        // console.log(data)
                        const remaining = inventories.filter(items => items._id !== id)
                        setInventories(remaining)
                    }
                })
        })()
    }

    return (
        <div className='min-h-[90vh] pt-3 pb-10 px-4 md:px-0'>
            <p className='text-center md:text-right mr-0 md:mr-20 mb-5 md:mb-0'>
                <button onClick={() => navigate('/inventories/add')} className='bg-green-600 py-3 px-5 rounded-lg hover:bg-green-700 duration-300 ease-in-out'>Add new inventory</button>
            </p>
            <h1 className='text-2xl md:text-4xl font-bold'>Manage Your Inventories</h1>
            <p className='text-sm md:text-base mt-3 w-full md:w-1/2 mx-auto opacity-70 font-thin mb-10'>You can manage your all inventories from here. You can update , delete and add more inventories from here.</p>
            <div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b border-slate-400 bg-slate-900">
                                        <tr>
                                            <th scope="col" className="text-sm px-6 py-4">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm px-6 py-4">
                                                Price
                                            </th>
                                            <th scope="col" className="text-sm px-6 py-4">
                                                Quantity
                                            </th>
                                            <th scope="col" className="text-sm px-6 py-4 hidden md:block">
                                                Supplier
                                            </th>
                                            <th scope="col" className="text-sm px-6 py-4">
                                                Button
                                            </th>
                                        </tr>
                                    </thead>
                                    {
                                        inventories.map(item => <Allinventories
                                            key={item._id}
                                            item={item}
                                            handleDelete={handleDelete} />)
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className='my-5'>
                {
                    [...Array(pageCount).keys()].map(num => <button
                        key={num}
                        onClick={() => setPageNo(num)}
                        className={`px-3 py-1 border border-cyan-500 rounded-md mx-1 ${num === pageNo ? 'bg-cyan-500' : ''}`}
                    >
                        {num + 1}
                    </button>)
                }
            </section>
        </div>
    );
};

export default ManageItems;