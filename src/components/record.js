import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from 'react-jsonschema-form';

import * as ra from '../actions/records-actions.js';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

class Record extends Component {
  handleSubmit = ({ formData }) => {
    // The record we send to the server should have all its properties;
    // _id and __v are missing from the formData. Merge formData with
    // the original record.
    const model = this.props.schema.title;
    const { record } = this.props;
    const payload = Object.assign({}, record, formData);
    // this.props.handlePatch(payload, model);
    this.props.handlePut(payload, model);
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
  handlePatch: (payload, model) => dispatch(ra.patch(payload, model)),
  handlePut: (payload, model) => dispatch(ra.put(payload, model)),
});

export default connect(
  null,
  mapDispatchToProps
)(Record);
