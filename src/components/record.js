import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-jsonschema-form';

import * as actions from '../actions/records-actions.js';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

class Record extends Component {
  handleSubmit = ({ formData }) => {
    // this.props.handlePatch(formData);
    this.props.handlePut(formData);
  };

  render() {
    return this.props.schema ? (
      <>
        <div>
          <h4>Edit Record</h4>
          <Form
            schema={this.props.schema}
            uiSchema={uiSchema}
            formData={this.props.record}
            onSubmit={this.handleSubmit}
          />
        </div>
      </>
    ) : null;
  }
}

const mapDispatchToProps = (dispatch, getState) => ({
  handlePatch: payload => dispatch(actions.patch(payload)),
  handlePost: payload => dispatch(actions.post(payload)),
  handlePut: payload => dispatch(actions.put(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(Record);
