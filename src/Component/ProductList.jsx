import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const ProductList = ({ products, deleteProduct, editProduct }) => {
  return (
    <div className='d-flex flex-row'>
    
    <div className='bg-white w-100 ' >
    <h4 className='text-center'>Product List</h4>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul className='list-group'>
          
          {products.map((product) => (
            <li key={product.id} className='list-group-item'>
              <strong>ID:</strong> {product.id} <br />
              <strong>Name:</strong> {product.ProductName} <br />
              <strong>Address:</strong> {product.ProductAddress} <br />
              <strong>Owner:</strong> {product.ProductOwner} <br />
              <strong>Quantity:</strong> {product.quantity} <br />
            

              <button className='btn btn-warning m-1' onClick={() => editProduct(product)}><i><FaEdit /></i></button>
              <button className='btn btn-danger m-1' onClick={() => deleteProduct(product.id)}><i><MdDelete /></i></button>
             
            
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ProductList;
