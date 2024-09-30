import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const ProductAdd = ({ saveProduct, currentProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [input, setInput] = useState({ ProductName: '', ProductAddress: '', ProductOwner: '' });

  useEffect(() => {
    // Populate the form if editing an existing product
    if (currentProduct) {
      setInput({
        ProductName: currentProduct.ProductName,
        ProductAddress: currentProduct.ProductAddress,
        ProductOwner: currentProduct.ProductOwner,
      });
      setQuantity(currentProduct.quantity);
    } else {
      // Reset form if not editing
      setInput({ ProductName: '', ProductAddress: '', ProductOwner: '' });
      setQuantity(1);
    }
  }, [currentProduct]);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const generateId = () => {
    return Math.random().toString().slice(2, 12);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      id: currentProduct ? currentProduct.id : generateId(), // Keep the same ID when editing
      ...input,
      quantity,
    };

    // Call the save product function from App
    saveProduct(product);

    setInput({ ProductName: '', ProductAddress: '', ProductOwner: '' });
    setQuantity(1);
  };

  return (
    <div className='container-fluid bg-white  p-3 ms-3' style={{height:'600px'}}>
    <div className='container-fluid bg-white p-3  w-100'>
      <h4 className='text-center'>{currentProduct ? 'Edit Product' : 'Add Product'}</h4>
      <form className='form-group' onSubmit={handleSubmit}>
        <input
          className='form-control m-2'
          placeholder='Product Name'
          id='ProductName'
          name='ProductName'
          value={input.ProductName}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          required
        />
        <input
          className='form-control m-2'
          placeholder='Product Address'
          id='ProductAddress'
          name='ProductAddress'
          value={input.ProductAddress}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          required
        />
        <input
          className='form-control m-2'
          placeholder='Product Owner'
          id='ProductOwner'
          name='ProductOwner'
          value={input.ProductOwner}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          required
        />

        <div className='d-flex align-items-center m-2'>
          <button type='button' className='btn btn-outline-secondary' onClick={decreaseQuantity}>-</button>
          <input
            type="number"
            className='form-control mx-2'
            value={quantity}
            readOnly
          />
          <button type='button' className='btn btn-outline-secondary' onClick={increaseQuantity}>+</button>
        </div>

        <button type='submit' className='btn btn-success w-100 m-2'>{currentProduct ? 'Update' : 'Add'}</button>
      </form>
    </div>
    </div>
  );
};

export default ProductAdd;
