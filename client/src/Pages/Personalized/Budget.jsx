import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import { useAuth } from '../../Context/Auth';
const BudgetSetter = () => {
  const [auth,SetAuth]=useAuth();
  console.log(auth);
  const [currentBudget, setCurrentBudget] = useState(500);
  const [budgetUsedPercentage, setBudgetUsedPercentage] = useState(60); // Assuming 60% used for demonstration
  const handleBudgetChange = (e) => {
    // Update the current budget based on input, but only if it's a number
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) { // Simple validation: input is a number and not negative
      const newBudget = Number(value);
      setCurrentBudget(Number(value));
      const updatedAuth = { ...auth, budget: newBudget };
      SetAuth({
        ...auth,
        budget: newBudget
      });

        localStorage.setItem('auth', JSON.stringify(updatedAuth));
    }
  };
  // Function to handle budget change via the preset buttons
  const adjustBudget = (percentage) => {
    setCurrentBudget((prevBudget) => {
      const adjustment = prevBudget * (percentage / 100);
      const newBudget = prevBudget + adjustment;
      // Update auth state with the new budget
      const updatedAuth = { ...auth, budget: newBudget };
      SetAuth({
        ...auth,
        budget: newBudget
      });

        localStorage.setItem('auth', JSON.stringify(updatedAuth));
      return newBudget;
    });
  };

  
  // Calculate the progress bar width based on budget used percentage
  const progressBarWidth = `${budgetUsedPercentage}%`;

  return (
    <Layout> <div className=" mt-4 rounded-lg border bg-white text-gray-800 shadow-sm w-full max-w-3xl mx-auto">
    <div className="space-y-1.5 p-6 flex flex-col items-start gap-1.5">
      <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">Budget Setter</h3>
      <p className="text-sm text-gray-500">
        Set your spending limit to stay within budget
      </p>
    </div>
    <div className="p-6 flex flex-col gap-4">
    <div className="flex items-center gap-4">
            <label htmlFor="current-budget" className="text-sm font-medium leading-none cursor-pointer opacity-70 flex-1">
              Current Budget
            </label>
            <input
              id="current-budget"
              type="text" // Using "text" type for simplicity, consider "number" with more validation
              className="text-2xl font-semibold bg-transparent border-none w-xl text-right outline-none"
              value={currentBudget}
              onChange={handleBudgetChange}
            />
          </div>
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium leading-none cursor-not-allowed opacity-70 flex-1" htmlFor="budget-progress">
          Budget Progress
        </label>
        <div>{budgetUsedPercentage}% used</div>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-blue-200 w-full" id="budget-progress">
        <div className="h-full bg-blue-500 transition-all" style={{ width: progressBarWidth }}></div>
      </div>
      {/* Preset budget adjustment buttons with Tailwind CSS for colors */}
      <div className="flex items-center gap-4">
        <button onClick={() => adjustBudget(-10)} className="bg-red-500 text-white h-9 rounded-md px-3 hover:bg-red-700 transition-colors">-10%</button>
        <button onClick={() => adjustBudget(-5)} className="bg-yellow-500 text-white h-9 rounded-md px-3 hover:bg-yellow-700 transition-colors">-5%</button>
        <button onClick={() => setCurrentBudget(500)} className="bg-gray-500 text-white h-9 rounded-md px-3 hover:bg-gray-700 transition-colors">Reset</button>
        <button onClick={() => adjustBudget(5)} className="bg-green-500 text-white h-9 rounded-md px-3 hover:bg-green-700 transition-colors">+5%</button>
        <button onClick={() => adjustBudget(10)} className="bg-blue-500 text-white h-9 rounded-md px-3 hover:bg-blue-700 transition-colors">+10%</button>
      </div>
      {/* Other elements like Suggested Budget can be added similarly */}
    </div>
    <div className="flex items-center p-6">
      <button className="ml-auto bg-blue-500 text-white h-10 px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Save</button>
    </div>
  </div></Layout>
   
  );
};

export default BudgetSetter;
