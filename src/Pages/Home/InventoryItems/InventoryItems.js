import React from 'react';
import useInventories from '../../../Hooks/useInventories';
import Inventory from '../Inventory/Inventory';

const InventoryItems = () => {
    const [inventories] = useInventories()
    return (
        <div className='mt-10 py-10 px-5 md:px-20'>
            <section>
                <h1 className='text-2xl md:text-5xl font-bold'>Your Inventories</h1>
                <p className='mt-3 w-full md:w-1/2 mx-auto opacity-70 font-thin'>Your inventories, you can have a look below. If you want to update any Item, please click Update button.</p>
                <div className='my-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {
                        inventories.map(item => <Inventory key={item._id} item={item} />)
                    }
                </div>
            </section>
        </div>
    );
};

export default InventoryItems;