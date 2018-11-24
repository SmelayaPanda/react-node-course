import React, {Component} from 'react';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import {reduxForm} from "redux-form";

class SurveyNew extends Component {

    state = {
        showFormReview: false
    }

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => this.setState({showFormReview: false})}/>
        }
        return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})}/>
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    // the same name as in SurveyForm but without destroyOnUnmount props
    form: 'surveyForm'
    // when this component unmounted form will be cleared
    // but if only SurveyForm unmounted all form values will be persisted
})(SurveyNew);