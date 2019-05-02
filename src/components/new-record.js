import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/records-actions.js';

import Form from 'react-jsonschema-form';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

class NewRecord extends Component {
  deleteRecord = id => this.props.handleDelete(id);
  handleSubmit = ({ formData }, e) => this.props.handlePost(formData);
  render() {
    return (
      <div>
        <h3>Add New Record</h3>
        <Form schema={this.props.schema} uiSchema={uiSchema} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: payload => dispatch(actions.post(payload)),
});

export default connect(
  null,
  mapDispatchToProps
)(NewRecord);
