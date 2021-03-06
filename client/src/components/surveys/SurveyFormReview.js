import React from 'react';
import {connect} from "react-redux";
import formFields from './formFields'
import * as actions from '../../actions'
import {withRouter} from "react-router-dom";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

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

            <div style={{marginTop: 20}}>
                <button className={'yellow darken-3 btn-flat white-text'} onClick={onCancel}>
                    Back
                </button>
                <button className={'green btn-flat white-text right'} onClick={() => submitSurvey(formValues, history)}>
                    Send Survey
                    <i className={'material-icons right'}>email</i>
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({formValues: state.form.surveyForm.values})

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));