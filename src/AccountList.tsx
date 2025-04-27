import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

interface Account {
  id: number;
  name: string;
  bank_name: string;
  account_id: string;
  account_type: string;
  currency: string;
  opening_balance: number;
  current_balance: number;
}

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [columnDefs] = useState<ColDef<Account>[]>([
    { field: 'name', headerName: 'Account Name' },
    { field: 'bank_name', headerName: 'Bank Name' },
    { field: 'account_id', headerName: 'Account ID' },
    { field: 'account_type', headerName: 'Account Type' },
    { field: 'currency', headerName: 'Currency' },
    { field: 'opening_balance', headerName: 'Opening Balance' },
    { field: 'current_balance', headerName: 'Current Balance' },
  ]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('/api/accounts');
        setAccounts(response.data);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };
    fetchAccounts();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={accounts}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
      />
    </div>
  );
};

export default AccountList;
