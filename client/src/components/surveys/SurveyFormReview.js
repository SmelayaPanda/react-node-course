import React from 'react';
import {connect} from "react-redux";
import formFields from './formFields'

const SurveyFormReview = ({onCancel, formValues}) => {

    const reviewFields = formFields.map(({label, name}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>

            {reviewFields}

            <button
                className={'yellow btn-flat darken-3'}
                onClick={onCancel}>
                Back
            </button>
        </div>
    );
};

const mapStateToProps = state => ({formValues: state.form.surveyForm.values})

export default connect(mapStateToProps, null)(SurveyFormReview);