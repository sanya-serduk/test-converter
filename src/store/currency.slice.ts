import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, Selector } from 'reselect';
import { AppState } from './index.ts';

interface Currency {
    value: string;
    price: number; // курс относительно usd
}

interface CurrencyState {
    [currency: string]: Currency;
}

const initialState: CurrencyState = {
    usd: {
        value: '',
        price: 1,
    },
    eur: {
        value: '',
        price: 1.07,
    },
    rub: {
        value: '',
        price: 0.01,
    },
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<{ name: string; value: string }>) => {
            const { name, value } = action.payload;
            if (state.hasOwnProperty(name)) {
                state[name].value = value;
            }
        },
    },
});

const selectCurrencyState = (state: AppState) => state.currency;

export const selectCurrencyPair: Selector<AppState, [Currency, Currency]> = createSelector(
    [selectCurrencyState, (_, pair: [string, string]) => pair],
    (currency, [from, to]) => [currency[from], currency[to]]
);

export const { setValue } = currencySlice.actions;
export default currencySlice.reducer;