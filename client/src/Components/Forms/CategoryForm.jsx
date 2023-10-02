import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CategoryForm = ({handleSubmit,value,SetValue}) => {

  




  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex-1 ">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={value}
                  onChange={()=>SetValue(event.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type category name"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 mt-2 sm:mt-4 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Add Category
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CategoryForm;
