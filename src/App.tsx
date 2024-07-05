import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from "./store/index.ts";
import FormConvertCurrency from "./components/form-convert-currency/FormConvertCurrency.tsx";

const App: React.FC = () => (
    <Provider store={store}>
        <div className="App">
            <FormConvertCurrency pair={['usd', 'eur']}/>
        </div>
    </Provider>
);

export default App;