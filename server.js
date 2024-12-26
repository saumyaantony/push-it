const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');  // Allow cross-origin requests from frontend

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// PostgreSQL connection pool setup
const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'menu_app', // Replace with your database name
    password: 'Admin@123', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

// 1. Route to get all menus from the database
app.get('/menus', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus');
    res.json(result.rows);  // Return all menus
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 2. Route to create a new menu
app.post('/menus', async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menus (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.status(201).json(result.rows[0]);  // Return the created menu
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 3. Route to delete a menu by ID
app.delete('/menus/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM menus WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Menu not found');
    }
    res.status(204).send();  // Return no content after successful delete
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// 2. Route to create a new item_detail
app.post('/item-details', async (req, res) => {
    const { menu_id, name, description, price } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO item_details (menu_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [menu_id, name, description, price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



// Update the endpoint to filter items by menu_name
app.get('/item-details', async (req, res) => {
    const { menu_name } = req.query; // Get menu_name from query parameter
    
    try {
      // Query items based on the menu_name
      const result = await pool.query(`
        SELECT item_details.id, item_details.name AS item_name, item_details.description, item_details.price, menus.name AS menu_name
        FROM item_details
        JOIN menus ON item_details.menu_id = menus.id
        WHERE menus.name = $1`, [menu_name]); // Filter by menu_name
      
      res.status(200).json(result.rows); // Return filtered items
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


  // Delete an item by its ID
app.delete('/item-details/:id', async (req, res) => {
    const { id } = req.params; // Get the item ID from the request parameters
    
    try {
      const result = await pool.query(`
        DELETE FROM item_details
        WHERE id = $1
        RETURNING *`, [id]); // Optionally, return the deleted item
  
      if (result.rowCount > 0) {
        res.status(200).json({ message: 'Item deleted successfully', deletedItem: result.rows[0] });
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  
  


  

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});








