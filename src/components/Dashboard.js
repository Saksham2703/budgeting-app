import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Dashboard = () => {
  const [expense, setExpense] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async () => {
    if (!expense || !category) {
      setMessage('Please fill in all fields');
      return;
    }
    try {
      await addDoc(collection(db, 'expenses'), {
        userId: auth.currentUser.uid,
        amount: expense,
        category: category,
        date: new Date(),
      });
      setMessage('Expense added successfully');
      fetchExpenses();
      setExpense('');
      setCategory('');
    } catch (e) {
      setMessage('Error adding expense: ' + e.message);
    }
  };

  const fetchExpenses = async () => {
    const q = query(collection(db, 'expenses'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const fetchedExpenses = [];
    querySnapshot.forEach((doc) => {
      fetchedExpenses.push({ id: doc.id, ...doc.data() });
    });
    setExpenses(fetchedExpenses);
  };

  const handleEditExpense = async (id, amount) => {
    const expenseRef = doc(db, 'expenses', id);
    try {
      await updateDoc(expenseRef, { amount: amount });
      setMessage('Expense updated successfully');
      fetchExpenses();
    } catch (e) {
      setMessage('Error updating expense: ' + e.message);
    }
  };

  const handleDeleteExpense = async (id) => {
    const expenseRef = doc(db, 'expenses', id);
    try {
      await deleteDoc(expenseRef);
      setMessage('Expense deleted successfully');
      fetchExpenses();
    } catch (e) {
      setMessage('Error deleting expense: ' + e.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <input type="text" placeholder="Expense Amount" value={expense} onChange={(e) => setExpense(e.target.value)} />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <button onClick={handleAddExpense}>Add Expense</button>
      {message && <p>{message}</p>}
      <div>
        <h2>Your Expenses:</h2>
        {expenses.map((exp) => (
          <div key={exp.id}>
            <p>{exp.category}: ${exp.amount}</p>
            <input type="text" placeholder="Edit Amount" defaultValue={exp.amount} onBlur={(e) => handleEditExpense(exp.id, e.target.value)} />
            <button onClick={() => handleDeleteExpense(exp.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
