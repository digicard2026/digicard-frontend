import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { CartProvider } from './components/Header/CartContext';
import {  ProfileProvider } from './pages/ProfileProvider';
import { InventoryProvider } from './pages/Inventory/InventoryContext';
import { KycProvider } from './pages/Authentication/KycContext';
import { Provider } from 'react-redux';
import store from './store/store';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
<React.StrictMode>
    <Router>
    <KycProvider>
        <CartProvider>
            <ProfileProvider>
                <InventoryProvider>
                     <Provider store={store}>
                    <App />
                    </Provider>
                </InventoryProvider>
            </ProfileProvider>
        </CartProvider>  
        </KycProvider>   
    </Router>
</React.StrictMode>

);
