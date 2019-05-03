import React from 'react';

import Form from 'react-jsonschema-form';

const uiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
};

const EditRecord = props =>
  props.schema ? (
    <div>
      <h4>Edit Record</h4>
      <Form
        schema={props.schema}
        uiSchema={uiSchema}
        formData={props.record}
        onSubmit={formData => props.handleEdit(formData, props.record)}
      />
    </div>
  ) : null;

export default EditRecord;
