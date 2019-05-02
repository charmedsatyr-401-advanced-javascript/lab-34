import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewRecord from './new-record';
import Record from './record';

import './app.scss';

import * as r from '../actions/records-actions';
import * as s from '../actions/schema-actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { model: 'players' };
  }
  deleteRecord = id => this.props.handleDelete(id);

  getSchema = () => {
    if (this.props.schema.cache[this.state.model]) {
      this.props.updateActiveSchema(this.state.model);
    } else {
      this.props.getSchema(this.state.model);
    }
  };
  setModel = () => {
    this.setState({ model: this.state.model === 'players' ? 'teams' : 'players' }, () => {
      this.getSchema();
    });
  };
  componentDidMount() {
    this.getSchema();
  }
  render() {
    const content = this.props.records.list.map((record, index) => (
      <li key={record._id}>
        {record.name}
        <button onClick={() => this.deleteRecord(record._id)}>Delete</button>
        <Record record={record} schema={this.props.schema.active} />
      </li>
    ));

    return (
      <>
        <div>
          <h3>Choose Your Schema</h3>
          <fieldset>
            <legend>Remember: don't mix records with different schemas!</legend>
            <label htmlFor="players">Players</label>
            <input
              id="players"
              type="radio"
              name="schema"
              value="players"
              checked={this.state.model === 'players'}
              onChange={this.setModel}
            />
            <label htmlFor="teams">Teams</label>
            <input
              id="teams"
              type="radio"
              name="schema"
              value="teams"
              checked={this.state.model === 'teams'}
              onChange={this.setModel}
            />
          </fieldset>
        </div>
        <NewRecord schema={this.props.schema.active} />
        <div>
          <h3>Current Records</h3>
          <ul>{content}</ul>
        </div>
      </>
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
)(App);
