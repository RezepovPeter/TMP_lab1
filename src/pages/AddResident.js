import React from 'react';
import Form from './Form';

const AddResident = ({ refresh }) => {
  return (
    <Form
      mode="create"
      resident={null}
      onClose={() => {}}
      refresh={refresh}
    />
  );
};

export default AddResident;