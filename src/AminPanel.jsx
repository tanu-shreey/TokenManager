import React, { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import UserData from './Component/UserData';
import ProductList from './Component/ProductList';
import ProductAdd from './Component/ProductAdd';

const AminPanel = () => {

  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); // To hold the product being edited

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user');  // Remove user data
    navigate('/login');  // Redirect to login page
  };

 

  // Load products from local storage on initial render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

// Function to add or update product in state and local storage
const saveProduct = (product) => {
  const updatedProducts = currentProduct
    ? products.map(p => (p.id === product.id ? product : p)) // Update existing product
    : [...products, product]; // Add new product

  setProducts(updatedProducts);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
  setCurrentProduct(null); // Reset current product after saving
};

  // Function to add product to state and local storage
  const addProduct = (product) => {
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };
        
  // Function to delete product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };


    // Function to initiate editing
    const editProduct = (product) => {
      setCurrentProduct(product);
    };
  return (
    <div className='container-fluid bg-light'>
      <div className='d-flex flex-row' style={{width:'100%'}}>
        <div className='pt-3' style={{backgroundColor:'#142044'}}>
          <UserData />
      <button className="btn bg-white " onClick={handleLogout} style={{marginTop:'300px' ,marginBottom:'20px' ,marginLeft:'20px'}}>Logout</button>

        </div>
        <div className='bg-white w-75 p-5'>
        <ProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct} />
        </div>
        <div className='bg-light w-25'>
        <ProductAdd saveProduct={saveProduct} currentProduct={currentProduct} />
        </div>
      </div>
    
    </div>
  );
};

export default AminPanel;
