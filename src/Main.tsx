// src/Main.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// src/Main.tsx
interface MainProps {
 onLogout: () => void;
}

const Main: React.FC<MainProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('token');
    navigate('/login');
  };

 const columnDefs: ColDef[] = [
 { field: 'column1' as const, headerName: 'Column1' },
 { field: 'column2' as const, headerName: 'Column2' },
 ];

 const rowData = [
 { column1: 'foo1', column2: 'bar1' },
 { column1: 'foo2', column2: 'bar2' },
 { column1: 'foo3', column2: 'bar3' },
 ];

 return (
 <div style={{ display: 'flex', height: '100vh' }}>
 <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
 <h2>Menu</h2>
 <ul>
 <li>
 <Link to="#">User</Link>
 </li>
 <li>
 <Link to="/accounts/list">Accounts</Link>
 </li>
 <li>
 <Link to="/accounts/new">Create Account</Link>
 </li>
 <li>
 <Link to="#">Transactions</Link>
 </li>
 <li>
 <button onClick={handleLogout}>Logout</button>
 </li>
 </ul>
 </div>
 <div style={{ flex:1, padding: '20px' }}>
 <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
 <AgGridReact columnDefs={columnDefs} rowData={rowData} />
 </div>
 </div>
 </div>
 );
};

export default Main;
