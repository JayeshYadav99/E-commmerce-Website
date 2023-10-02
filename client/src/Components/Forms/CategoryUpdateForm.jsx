import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const CategoryUpdateForm = () => {
    const [categoryName, setCategoryName] = useState('');
  
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/category/update-category`, {
        name: categoryName,
       
      });

      if (response.data.success) {
        toast.success('Category created successfully');
        setCategoryName(''); // Clear the input field
      
      } else {
        toast.error('Failed to create category');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }
  return (
    <div>CategoryUpdateForm</div>
  )
}

export default CategoryUpdateForm