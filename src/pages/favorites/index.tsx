import React from 'react';
import withAuth from 'utils/withAuth';

const Favorites = () => {
  return (
    <div>
      <h1>Favourites is protected </h1>
    </div>
  );
};

export default withAuth(Favorites);
