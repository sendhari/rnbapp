import React, { useState } from 'react';
import Table from './components/Table';
import './App.css';

function App() {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    const addTable = () => {
        const tableNumber = prompt("Enter Table Number:");
        if (tableNumber && !tables.find(t => t.id === tableNumber)) {
            setTables(prev => [...prev, {
                id: tableNumber,
                name: `Table ${tableNumber}`,
                timestamp: new Date().toLocaleString()
            }]);
        } else if (tables.find(t => t.id === tableNumber)) {
            alert("Table number already exists!");
        }
    };

    return (
        <div className="App">
            <div className="sidebar">
                <h2>Tables</h2>
                <button className="add-table-btn" onClick={addTable}>Add New Table</button>
                <div className="table-list">
                    {tables.map(table => (
                        <div 
                            key={table.id} 
                            className={`table-item ${selectedTable === table.id ? 'active' : ''}`}
                            onClick={() => setSelectedTable(table.id)}
                        >
                            <div>{table.name}</div>
                            <small>{table.timestamp}</small>
                        </div>
                    ))}
                </div>
            </div>
            <div className="main-content">
                {selectedTable ? (
                    <Table tableId={selectedTable} />
                ) : (
                    <div className="no-table-selected">
                        <h2>Select a table or add a new one</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
