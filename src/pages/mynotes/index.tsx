import React from 'react';
import withAuth from 'utils/withAuth';

const MyNotes = () => {
  return (
    <div>
      <h1>My notes is protected</h1>
    </div>
  );
};

export default withAuth(MyNotes);
