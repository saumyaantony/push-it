import React from 'react';

const CreateMenu = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Menu</h1>
      <form>
        <label>
          Menu Name: 
          <input type="text" placeholder="Enter menu name" />
        </label>
        <br />
        <label>
          Description: 
          <textarea placeholder="Enter menu description"></textarea>
        </label>
        <br />
        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
};

export default CreateMenu;
