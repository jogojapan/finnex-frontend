import React, { useState } from 'react';
import axios from 'axios';

const CreateAccountForm = () => {
 const [accountData, setAccountData] = useState({
 name: '',
 bankName: '',
 accountId: '',
 accountType: '',
 currency: '',
 openingBalance: '',
 });
 const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccountData({ ...accountData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/', {
        name: accountData.name,
        bank_name: accountData.bankName,
        account_id: accountData.accountId,
        account_type: accountData.accountType,
        currency: accountData.currency,
        opening_balance: accountData.openingBalance,
      });
      console.log(response.data);
      // Handle successful creation, e.g., redirect to account list
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    }
  };

 return (
 <form onSubmit={handleSubmit}>
 <label>
 Name:
 <input type="text" name="name" value={accountData.name} onChange={handleChange} />
 </label>
 <br />
 <label>
 Bank Name:
 <input type="text" name="bankName" value={accountData.bankName} onChange={handleChange} />
 </label>
 <br />
 <label>
 Account ID:
 <input type="text" name="accountId" value={accountData.accountId} onChange={handleChange} />
 </label>
 <br />
 <label>
 Account Type:
 <select name="accountType" value={accountData.accountType} onChange={handleChange}>
 <option value="">Select account type</option>
 <option value="cash">Cash</option>
 <option value="checkings">Checkings/Giro</option>
 <option value="savings">Savings</option>
 <option value="credit_card">Credit Card</option>
 </select>
 </label>
 <br />
 <label>
 Currency:
 <input type="text" name="currency" value={accountData.currency} onChange={handleChange} />
 </label>
 <br />
 <label>
 Opening Balance:
 <input type="number" name="openingBalance" value={accountData.openingBalance} onChange={handleChange} />
 </label>
 <br />
 <button type="submit">Create Account</button>
 {error && <p style={{ color: 'red' }}>{error}</p>}
 </form>
 );
};

export default CreateAccountForm;
