import React from 'react';

// two level destructuring for meta
const SurveyField = ({input, label, meta: {error, touched}}) => {
    return (
        <div style={{marginBottom: '15px'}}>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '2px', height: '24px'}}/>
            <small className={'red-text'}>
                {/* js interpretation return second operand if both true */}
                {touched && error}
            </small>
        </div>
    );
};

export default SurveyField;