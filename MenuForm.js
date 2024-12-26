import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MenuForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const menuData = {
      name,
      description,
    };

    try {
      const response = await axios.post('http://localhost:5000/menus', menuData);
      console.log('Menu created:', response.data);  // Handle success response
       // On success, show the success message
      setSuccessMessage('Menu created successfully!');

      // Clear input fields
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error posting menu:', error);  // Handle error
    }
  };

  return (
    <div>
      <h2>Create a New Menu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Menu Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Menu</button>
        <Link to="/menu-list">Create MENU item details</Link>
      </form>
     {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default MenuForm;




