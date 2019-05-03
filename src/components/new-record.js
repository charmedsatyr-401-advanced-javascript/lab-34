import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/records-actions';

import Form from 'react-jsonschema-form';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

class NewRecord extends Component {
  deleteRecord = id => this.props.handleDelete(id);
  handleSubmit = ({ formData }, e) => this.props.handlePost(formData);
  render() {
    console.log('this.props.schema', this.props.schema.active.title);
    return this.props.schema ? (
      <div>
        <h3>Add New {this.props.schema.active.title}</h3>
        <Form schema={this.props.schema.active} uiSchema={uiSchema} onSubmit={this.handleSubmit} />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({
  records: state.records,
  schema: state.schema,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: payload => dispatch(actions.post(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecord);
