import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../components/service/ApiService";
import '../../style/addProduct.css';

const AddProductPage = () => {
    const [imageUrl, setImageUrl] = useState('');  // Changed to store image URL as a string
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                imageUrl,   // Use the image URL here
                categoryId,
                name,
                description,
                price
            };

            const response = await ApiService.addProduct(productData);
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate('/artisan/product');
                }, 3000);
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Unable to upload product');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="product-form">
                <h2>Add Product</h2>
                {message && <div className="message">{message}</div>}
                <input 
                    type="text" 
                    placeholder="Image URL" 
                    value={imageUrl} 
                    onChange={(e) => setImageUrl(e.target.value)} 
                />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <input 
                    type="text" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <textarea 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProductPage;
