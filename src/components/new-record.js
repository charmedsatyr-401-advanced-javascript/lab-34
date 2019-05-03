import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as r from '../actions/records-actions';

import Form from 'react-jsonschema-form';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

class NewRecord extends Component {
  handleSubmit = ({ formData }, e) => {
    const model = this.props.schema.active.title;
    this.props.handlePost(formData, model);
  };

  render() {
    return this.props.schema ? (
      <div>
        <h3>Add New {this.props.schema.active.title}</h3>
        <Form schema={this.props.schema.active} uiSchema={uiSchema} onSubmit={this.handleSubmit} />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  schema: state.schema,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: (payload, model) => dispatch(r.post(payload, model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecord);
