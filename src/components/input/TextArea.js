import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

const TextArea = ({
	name,
	cols,
	rows,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
	return (
		<div className="form-group">
			<textarea
				className={ classnames('form-control-lg form-control bg-white border-left-0 border-md', {
					'is-invalid': error
				})}
				cols={ cols } rows={ rows }
				placeholder={ placeholder }
				name={ name }
				value={ value }
				onChange={ onChange }
			/>
			{ info && <small className="form-text text-muted">{ info }</small> }
			{ error && <div className="invalid-feedback">{ error }</div> }
		</div>
	);
};

TextArea.propTypes = {
	name: PropTypes.string.isRequired,
	cols: PropTypes.string,
	rows: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	info: PropTypes.string,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired
};

export default TextArea;