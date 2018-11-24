import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'
import SurveyField from "./SurveyField";

const FIELDS = [
    {name: 'title', label: 'Survey Title'},
    {name: 'subject', label: 'Subject line'},
    {name: 'body', label: 'Email Body'},
    {name: 'emails', label: 'Recipient List'}
]

class SurveyForm extends Component {

    static renderFields() {
        return FIELDS.map(({name, label}) => {
           return <Field key={name} name={name} label={label} type={'text'} component={SurveyField}/>
        })
    }

    render() {
        return (
            <div>
                {/* handleSubmit - provided automatically by redux-form */}
                <form onSubmit={this.props.handleSubmit(val => console.log(val))}>

                    {SurveyForm.renderFields()}

                    <button type={'submit'}>Submit</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);