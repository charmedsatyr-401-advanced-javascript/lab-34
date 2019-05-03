import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as ra from '../actions/records-actions';
import * as sa from '../actions/schema-actions';

import Record from './record';
import models from '../lib/set-models';

class Records extends Component {
  handleDelete = record => {
    const model = this.props.schema.active.title;
    this.props.handleDelete(record, model);
  };
  // schema active title is not around when records is mounting
  //
  componentDidMount() {
    const model = this.props.schema.active.title || models[0];
    console.log('MODEL:', model);

    if (model) {
      this.props.getAll(model);
    }
  }
  render() {
    const content = this.props.records.list.map((record, index) => (
      <li key={record._id}>
        {record.name} <button onClick={() => this.handleDelete(record)}>Delete</button>
        <Record record={record} schema={this.props.schema.active} />
      </li>
    ));

    return (
      <div>
        <h3>Current Records</h3>
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
  getAll: model => dispatch(ra.get(model)),
  handleDelete: (payload, model) => dispatch(ra.destroy(payload, model)),
  getSchema: model => dispatch(sa.getSchema(model)),
  updateActiveSchema: model => dispatch(sa.updateActiveSchema(model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
