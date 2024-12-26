import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [menuId, setMenuId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch menus for the dropdown
    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/menus');
                setMenus(response.data);
            } catch (error) {
                console.error('Error fetching menus:', error);
            }
        };
        fetchMenus();
    }, []);

    // Handle form submission for item_details
    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemData = { menu_id: menuId, name: itemName, description: itemDescription, price: itemPrice };
        try {
            const response = await axios.post('http://localhost:5000/item-details', itemData);
            setSuccessMessage('Item added successfully!');
            setMenuId('');
            setItemName('');
            setItemDescription('');
            setItemPrice('');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <div>
        <h2>Create a New Menu Item</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="menu">Menu:</label>
                <select
                    id="menu"
                    value={menuId}
                    onChange={(e) => setMenuId(e.target.value)}
                    required
                >
                    <option value="">Select a menu</option>
                    {menus.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                            {menu.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="name">Item Name:</label>
                <input
                    type="text"
                    id="name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Item</button>
        </form>
        {successMessage && <p>{successMessage}</p>}
    </div>
);
};

export default MenuList;
