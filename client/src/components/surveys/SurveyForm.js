import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import SurveyField from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from './formFields'

class SurveyForm extends Component {

    static renderFields = () => formFields.map(field => {
        return <Field key={field.name} {...field} type={'text'} component={SurveyField}/>
    });

    render() {
        const {handleSubmit, onSurveySubmit} = this.props

        return (
            <div style={{marginTop: '20px'}}>
                {/* handleSubmit - provided automatically by redux-form with props */}
                <form onSubmit={handleSubmit(onSurveySubmit)}>

                    {SurveyForm.renderFields()}

                    <Link to={'/surveys'} className={'btn-flat red white-text'}>
                        Cancel
                    </Link>

                    <button type={'submit'} className={'teal btn-flat right white-text'}>
                        Next
                        <i className={'material-icons right'}>done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {}

    errors.recipients = validateEmails(values.recipients)

    formFields.forEach(({name}) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`
        }
    })

    return errors // if empty => form is valid
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);