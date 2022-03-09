import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { name, id } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `album/${id}` }
        >
          { name }
        </Link>
        <p>{ id }</p>
      </div>
    );
  }
}

Card.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default Card;
