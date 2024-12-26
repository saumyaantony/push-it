import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [menus, setMenus] = useState([]);  // State to store menus
    const [items, setItems] = useState([]);  // State to store items for selected menu
    const [activeIndex, setActiveIndex] = useState(null);  // To track the active menu
    const [selectedMenu, setSelectedMenu] = useState('DRINKS');  // Selected menu name
    const [error, setError] = useState(null);  // To handle errors

    // Fetch menus when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/menus')
            .then(response => {
                setMenus(response.data);  // Set the menus data
            })
            .catch(err => {
                console.error(err);
                setError('Failed to fetch menu data');
            });
    }, []);

    // Fetch items for the selected menu
    useEffect(() => {
        if (selectedMenu) {
            fetch(`http://localhost:5000/item-details?menu_name=${selectedMenu}`)
                .then(response => response.json())
                .then(data => {
                    setItems(data);  // Set the items for the selected menu
                })
                .catch(error => console.error('Error fetching items:', error));
        }
    }, [selectedMenu]);  // Trigger when selectedMenu changes


    useEffect(() => {
        axios.get('http://localhost:5000/menus')
          .then(response => {
            setMenus(response.data); // Set menus data
            setActiveIndex(1); // Set active index to the first menu (Drinks in this case)
          })
          .catch(err => {
            console.error(err);
            setError('Failed to fetch menu data');
          });
      }, []);

    // Handle menu click
    const handleMenuClick = (menuName, index) => {
        setSelectedMenu(menuName);  // Set selected menu
        setActiveIndex(index);  // Set the active menu index to highlight it
    };

    return (
        <div>
            <header className="header">
                <div className='logo'>
                    <div>
                        <img src={require("../Assets/Images/Logo.png")} alt="Logo" />
                    </div>
                    <div>
                        <h3>DEEP <span className='span1'>NET</span> <br /><span className='span2'>SOFT</span></h3>
                    </div>
                </div>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={() => document.querySelector('.nav').classList.toggle('active')}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>

                <div className='nav'>
                    <a href="/">HOME</a>
                    <a href="/create-menu">MENU</a>
                    <a href="/reservation">MAKE A RESERVATION</a>
                    <a href="/contact">CONTACT US</a>
                </div>
            </header>

            {/* Spotlight */}
            <div className='spotlight'>
                <div>
                    <Link to="/create-menu" style={{ textDecoration: "none", color: "inherit" }}>
                        <h2>MENU</h2>
                    </Link>
                </div>
                <div>
                    <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to <br />
                        <span>place an order, use the "Order Online" button located below the menu.</span>
                    </p>
                </div>
            </div>

            {/* Menu List */}
            <div className="items">
                <ul className='menu'>
                    {menus.map((menu, index) => (
                        <li className='menu-li'
                            key={menu.id}
                            onClick={() => handleMenuClick(menu.name, index)}  // Pass the menu name
                            style={{
                                backgroundColor: activeIndex === index ? '#088cdf' : 'black',
                                cursor: 'pointer',
                            }}
                        >
                            <Link style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{menu.name}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Item List */}
            <div className='item-list'>
                <div className='side-img'>
                    <img src={require("../Assets/Images/side-images/Frame (2).png")} alt="Side Image 1" />
                </div>
                <div className='center-box'>
                    <div>
                    <h1 className='brunch'>
                        <div className='line1'></div>
                        BRUNCH COCKTAILS
                        <div className='line2'></div>
                    </h1>
                    {/* Display items for the selected menu */}
                    <div className='item-details'>
                        {items.length === 0 ? (
                            <p>No items available</p>
                        ) : (
                            <ul>
                                {items.map(item => (
                                    <li key={item.id}>
                                        <div className='price'>
                                        <h3>{item.item_name}</h3>
                                        <h3>${item.price}</h3>
                                        </div>
                                        <p className='des'>{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className='first-glass'>
                        <img src={require("../Assets/Images/first-glass.png")} alt="First Glass" />
                    </div>
                    <div className='last-glass'>
                        <img src={require("../Assets/Images/last-glass.png")} alt="Last Glass" />
                    </div>
                </div>
                </div>
                <div className='side-img1'>
                    <img src={require("../Assets/Images/side-images/Frame (3).png")} alt="Side Image 2" />
                </div>
            </div>
            <div className='contact'>
            <div className='boxes'>
            <div className='box'>
                <h4 className='blue'>Connect with Us</h4>
                <div className='call'>
            <img src={require("../Assets/Images/call.png")} />
            <p>+91 9567843340</p></div>
            <div className='mail'>
            <img src={require("../Assets/Images/mail.png")}  />
            <p>info@deepnetsoft.com</p></div>
            </div>
            
            
            <div className='mid-box'>
            <div className='deep'>
            <img src={require("../Assets/Images/Logo.png")} />
            </div>
            <div className='net'>
            {/* <img src={require("../Assets/Images/logo-name.png")} /> */}
            <h2> DEEP <span className='span1'> NET </span> <span className='span2'> SOFT</span></h2>
            </div>
            <div className='icons'>
            <img src={require("../Assets/Images/icons.png")} />
            </div>
            </div>
            <div className='box'>
                <h4 className='blue'>Find us</h4>
            <div className='location'>
            <img src={require("../Assets/Images/location.png")} />   
            <p>First floor, Geo infopark, Infopark EXPY, Kakkanad</p>
            </div>
            </div>
            </div>
            </div>
            <div className='footer'>
            <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
            <div className='terms'>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
            </div>
            </div>
        </div>
    );
};

export default Header;
