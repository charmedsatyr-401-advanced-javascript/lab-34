import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as r from '../actions/records-actions';
import * as s from '../actions/schema-actions';

import models from '../lib/set-models';

class SetSchema extends Component {
  constructor(props) {
    super(props);
    this.state = { model: models.child };
  }
  setModel = model => {
    this.setState({ model }, () => {
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
    let inputs = [];
    for (let model in models) {
      inputs.push(models[model]);
    }
    inputs = inputs.map((model, i) => {
      return (
        <span key={`model-${i}`}>
          <label htmlFor={model}>{model}</label>
          <input
            id={model}
            type="radio"
            name="schema"
            value={model}
            checked={this.state.model === model}
            onChange={() => this.setModel(model)}
          />
        </span>
      );
    });

    return (
      <div>
        <h3>Choose Your Schema</h3>
        <fieldset>
          <legend>What kind of record?</legend>
          {inputs}
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
