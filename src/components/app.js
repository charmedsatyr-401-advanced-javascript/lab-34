import React, { Component } from 'react';
import { connect } from 'react-redux';

import NewRecord from './new-record';
import Record from './record';

import './app.scss';

import superagent from 'superagent';

// Remote
import API_SERVER_URL from '../api-server-url';

// Fallback
import schema from '../players.schema.json';

import * as actions from '../store/records-actions.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { remoteSchema: false, schema };
  }
  deleteRecord = id => this.props.handleDelete(id);
  getRemoteSchema = () => {
    if (this.state.remoteSchema) {
      superagent.get(API_SERVER_URL).then(newSchema => {
        this.setState({ schema: newSchema.body });
        console.log('state:', this.state.schema);
      });
    } else {
      this.setState({ schema });
    }
  };
  setSchema = () => {
    this.setState({ remoteSchema: !this.state.remoteSchema }, () => {
      this.getRemoteSchema();
    });
  };
  componentDidMount() {
    this.getRemoteSchema();
  }
  render() {
    const content = this.props.records.list.map((record, index) => (
      <li key={record._id}>
        {record.name}
        <button onClick={() => this.deleteRecord(record._id)}>Delete</button>
        <Record record={record} schema={this.state.schema} />
      </li>
    ));

    return (
      <>
        <div>
          <h3>Choose Your Schema</h3>
          <fieldset>
            <legend>Remember: don't mix records with different schemas!</legend>
            <label htmlFor="local">Local</label>
            <input
              id="local"
              type="radio"
              name="schema"
              value="local"
              checked={!this.state.remoteSchema}
              onChange={this.setSchema}
            />
            <label htmlFor="remote">Remote</label>
            <input
              id="remote"
              type="radio"
              name="schema"
              value="remote"
              checked={this.state.remoteSchema}
              onChange={this.setSchema}
            />
          </fieldset>
        </div>
        <NewRecord schema={this.state.schema} />
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
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleDelete: id => dispatch(actions.destroy(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
