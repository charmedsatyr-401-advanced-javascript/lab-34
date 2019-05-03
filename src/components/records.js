import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ra from '../actions/records-actions';

import EditRecord from './edit-record';
import models from '../lib/set-models';

class Records extends Component {
  constructor(props) {
    super(props);
    this.state = { active: null };
  }
  handleEdit = ({ formData }, record) => {
    // The record we send to the server should have all its properties;
    // _id and __v are missing from the formData. Merge formData with
    // the original record.
    const model = this.props.schema.active.title;
    const payload = Object.assign({}, record, formData);
    // this.props.handlePatch(payload, model);
    this.props.handlePut(payload, model);
    this.setState({ active: null });
  };

  handleDelete = record => {
    const model = this.props.schema.active.title;
    this.props.handleDelete(record, model);
  };
  setActive = record => {
    this.setState({ active: record });
  };
  componentDidMount() {
    const model = this.props.schema.active.title || models[0];
    if (model) {
      this.props.handleGet(model);
    }
  }
  render() {
    const content = this.props.records.list.map((record, index) => (
      <li key={record._id}>
        {record.name} <button onClick={() => this.setActive(record)}>Edit</button>
        <button onClick={() => this.handleDelete(record)}>Delete</button>
        {this.state.active && this.state.active._id === record._id && (
          <EditRecord
            record={this.state.active}
            schema={this.props.schema.active}
            handleEdit={this.handleEdit}
          />
        )}
      </li>
    ));

    return (
      <div>
        <h3>Current {this.props.schema.active.title || 'Records'}</h3>
        <ul>{content.length > 0 ? content : 'No records!'}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records,
  schema: state.schema,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleGet: model => dispatch(ra.get(model)),
  handleDelete: (payload, model) => dispatch(ra.destroy(payload, model)),
  handlePatch: (payload, model) => dispatch(ra.patch(payload, model)),
  handlePut: (payload, model) => dispatch(ra.put(payload, model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
