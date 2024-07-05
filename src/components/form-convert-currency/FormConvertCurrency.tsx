import './FormConvertCurrency.css';
import React from 'react';
import TextInput from '../text-input/TextInput.tsx';
import { useAppDispatch, useAppSelector } from '../../store/index.ts';
import { setValue, selectCurrencyPair } from '../../store/currency.slice.ts';
import { getAmountConverted, getDecimalNumberFromString, getFixedNumber } from '../../helpers/index.ts';

interface Props {
	pair: [string, string];
}

const FormConvertCurrency: React.FC<Props> = ({ pair }) => {
	const [fromName, toName] = pair;
	const [fromState, toState] = useAppSelector((state) => selectCurrencyPair(state, pair));
	const dispatch = useAppDispatch();

	function updateValue(name: string, value: string) {
		dispatch(setValue({ name, value }));
	}

	function getValueConverted(fromPrice: number, toPrice: number, sum: number): string {
		const sumConverted = getAmountConverted(fromPrice, toPrice, sum);
		const sumToFixed = getFixedNumber(sumConverted, 5);
		return !isNaN(sumToFixed) ? sumToFixed.toString() : '';
	}

	function setCaretPositionNextFrame(el: HTMLInputElement, position: number) {
		window.requestAnimationFrame(() => {
			el.selectionStart = position;
			el.selectionEnd = position;
		})
	}

	function handlerOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		const name = e.target.name;
		const value = getDecimalNumberFromString(e.target.value);
		const sum = parseFloat(value);
		const prevCaretPosition = e.target.selectionStart - (e.target.value.length - e.target.defaultValue.length);
		const nextCaretPosition = e.target.selectionStart + (value.length - e.target.value.length);

		if (!isNaN(sum) && !isFinite(sum)) {
			setCaretPositionNextFrame(e.target, prevCaretPosition);
			return;
		}

		if (name === fromName && value !== fromState.value) {
			updateValue(name, value);
			updateValue(toName, getValueConverted(fromState.price, toState.price, sum));
			setCaretPositionNextFrame(e.target, nextCaretPosition);
			return;
		}

		if (name === toName && value !== toState.value) {
			updateValue(name, value);
			updateValue(fromName, getValueConverted(toState.price, fromState.price, sum));
			setCaretPositionNextFrame(e.target, nextCaretPosition);
			return;
		}

		setCaretPositionNextFrame(e.target, prevCaretPosition);
	}

	return (
		<form className="form-convert-currency">
			<div className="form-convert-currency__input">
				<TextInput
					name={fromName}
					label={fromName.toUpperCase()}
					value={fromState.value}
					type="text"
					inputMode="decimal"
					autoComplete="off"
					spellCheck="false"
					onChange={handlerOnChange}
				/>
			</div>
			<div className="form-convert-currency__input">
				<TextInput
					name={toName}
					label={toName.toUpperCase()}
					value={toState.value}
					type="text"
					inputMode="decimal"
					autoComplete="off"
					spellCheck="false"
					onChange={handlerOnChange}
				/>
			</div>
		</form>
	);
};

export default FormConvertCurrency;