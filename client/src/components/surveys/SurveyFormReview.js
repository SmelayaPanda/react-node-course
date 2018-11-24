import React from 'react';

const SurveyFormReview = ({onCancel}) => {
    return (
        <div>
            <h5>Please confirm your entries</h5>

            <button
                className={'yellow btn-flat darken-3'}
                onClick={onCancel}>
                Back
            </button>
        </div>
    );
};

export default SurveyFormReview;