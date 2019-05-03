import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as r from '../actions/records-actions';
import * as s from '../actions/schema-actions';

class SetSchema extends Component {
  constructor(props) {
    super(props);
    this.state = { model: 'players' };
  }
  setModel = () => {
    this.setState({ model: this.state.model === 'players' ? 'teams' : 'players' }, () => {
      this.getSchema();
    });
  };
  getSchema = () => {
    if (this.props.schema.cache[this.state.model]) {
      this.props.updateActiveSchema(this.state.model);
    } else {
      this.props.getSchema(this.state.model);
    }
  };
  componentDidMount() {
    this.getSchema();
  }

  render() {
    return (
      <div>
        <h3>Choose Your Schema</h3>
        <fieldset>
          <legend>Add a new team or player?</legend>
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
)(SetSchema);
