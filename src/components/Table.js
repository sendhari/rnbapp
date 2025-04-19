import React, { useState } from 'react';
import { DRINK_BRANDS, QUANTITY_TYPES, BEVERAGES } from '../data/constants';

const Table = ({ tableId }) => {
    const initialState = {
        drinks: [],
        beverages: [],
        food: [],
        others: []
    };

    const [items, setItems] = useState(initialState);
    const [paid, setPaid] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const addItem = (section, item) => {
        setItems(prev => ({
            ...prev,
            [section]: [...prev[section], item]
        }));
    };

    const calculateSectionTotal = (section) => {
        return items[section].reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateGrandTotal = () => {
        return Object.keys(items).reduce((total, section) => total + calculateSectionTotal(section), 0);
    };

    const handlePayment = () => {
        setPaid(true);
        setShowSummary(true);
    };

    const handleConfirmation = () => {
        setConfirmed(true);
        setShowSummary(false);
        setItems(initialState);
        setTimeout(() => {
            setPaid(false);
            setConfirmed(false);
        }, 2000);
    };

    const renderItemsList = (sectionItems, sectionName) => {
        return sectionItems.length > 0 && (
            <div className="summary-section">
                <h4>{sectionName}</h4>
                {sectionItems.map((item, index) => (
                    <div key={index} className="summary-item">
                        {item.brand || item.type || item.name} - 
                        {item.quantityType ? `${item.quantityType} x ` : ''}
                        {item.quantity} units - ${item.price * item.quantity}
                    </div>
                ))}
                <div className="section-total">
                    Section Total: ${calculateSectionTotal(sectionName.toLowerCase())}
                </div>
            </div>
        );
    };

    return (
        <div className="table-container">
            <h2>Table {tableId}</h2>
            
            {/* Drinks Section */}
            <section>
                <h3>Drinks</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addItem('drinks', {
                        brand: e.target.brand.value,
                        quantityType: e.target.quantityType.value,
                        quantity: parseInt(e.target.quantity.value),
                        price: parseFloat(e.target.price.value)
                    });
                    e.target.reset();
                }}>
                    <select name="brand" required>
                        {DRINK_BRANDS.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    <select name="quantityType" required>
                        {QUANTITY_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <input type="number" name="quantity" placeholder="Quantity" required />
                    <input type="number" name="price" placeholder="Price" step="0.01" required />
                    <button type="submit">Add Drink</button>
                </form>
                <p>Section Total: ${calculateSectionTotal('drinks')}</p>
            </section>

            {/* Beverages Section */}
            <section>
                <h3>Beverages</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addItem('beverages', {
                        type: e.target.type.value,
                        quantity: parseInt(e.target.quantity.value),
                        price: parseFloat(e.target.price.value)
                    });
                    e.target.reset();
                }}>
                    <select name="type" required>
                        {BEVERAGES.map(beverage => (
                            <option key={beverage} value={beverage}>{beverage}</option>
                        ))}
                    </select>
                    <input type="number" name="quantity" placeholder="Quantity" required />
                    <input type="number" name="price" placeholder="Price" step="0.01" required />
                    <button type="submit">Add Beverage</button>
                </form>
                <p>Section Total: ${calculateSectionTotal('beverages')}</p>
            </section>

            {/* Food Section */}
            <section>
                <h3>Food</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addItem('food', {
                        name: e.target.name.value,
                        quantity: parseInt(e.target.quantity.value),
                        price: parseFloat(e.target.price.value)
                    });
                    e.target.reset();
                }}>
                    <input type="text" name="name" placeholder="Food Item" required />
                    <input type="number" name="quantity" placeholder="Quantity" required />
                    <input type="number" name="price" placeholder="Price" step="0.01" required />
                    <button type="submit">Add Food</button>
                </form>
                <p>Section Total: ${calculateSectionTotal('food')}</p>
            </section>

            {/* Others Section */}
            <section>
                <h3>Others</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addItem('others', {
                        name: e.target.name.value,
                        quantity: parseInt(e.target.quantity.value),
                        price: parseFloat(e.target.price.value)
                    });
                    e.target.reset();
                }}>
                    <input type="text" name="name" placeholder="Item Name" required />
                    <input type="number" name="quantity" placeholder="Quantity" required />
                    <input type="number" name="price" placeholder="Price" step="0.01" required />
                    <button type="submit">Add Item</button>
                </form>
                <p>Section Total: ${calculateSectionTotal('others')}</p>
            </section>

            <div className="totals">
                <h3>Grand Total: ${calculateGrandTotal()}</h3>
                {!paid && !showSummary && <button onClick={handlePayment}>Pay Now</button>}
                {showSummary && (
                    <div className="purchase-summary">
                        <h3>Purchase Summary - Table {tableId}</h3>
                        {renderItemsList(items.drinks, "Drinks")}
                        {renderItemsList(items.beverages, "Beverages")}
                        {renderItemsList(items.food, "Food")}
                        {renderItemsList(items.others, "Others")}
                        <div className="final-total">
                            Final Total: ${calculateGrandTotal()}
                        </div>
                        <button onClick={handleConfirmation}>Confirm Payment</button>
                    </div>
                )}
                {confirmed && <p>Payment Confirmed!</p>}
            </div>
        </div>
    );
};

export default Table;