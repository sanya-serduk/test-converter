import './TextInput.css';
import React from 'react';

interface TextInputProps {
	label?: string;
	type?: 'text' | 'number' | 'password' | 'email' | 'url' | 'tel' | 'search';
	inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
	name: string;
	value: string;
	autoComplete?: 'on' | 'off';
	spellCheck?: boolean;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput: React.FC<TextInputProps> = (props) => {
	return (
		<label className="text-input">
      		<span className="text-input__label">
        		{props.label || props.name}
      		</span>
			<input
				className="text-input__field"
				type={props.type}
				name={props.name}
				value={props.value}
				autoComplete={props.autoComplete}
				spellCheck={props.spellCheck}
				onChange={props.onChange}
			/>
		</label>
	);
};

export default TextInput;
