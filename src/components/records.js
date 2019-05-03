import React, { Component } from 'react';
import { connect } from 'react-redux';

import Record from './record';

import * as r from '../actions/records-actions';
import * as s from '../actions/schema-actions';

class Records extends Component {
  deleteRecord = id => this.props.handleDelete(id);
  render() {
    const content = this.props.records.list.map((record, index) => (
      <li key={record._id}>
        {record.name}
        <button onClick={() => this.deleteRecord(record._id)}>Delete</button>
        <Record record={record} schema={this.props.schema.active} />
      </li>
    ));

    return (
      <div>
        <h3>Current Records</h3>
        <ul>{content}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records,
  schema: state.schema,
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleDelete: id => dispatch(r.destroy(id)),
  getSchema: model => dispatch(s.getSchema(model)),
  updateActiveSchema: model => dispatch(s.updateActiveSchema(model)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
