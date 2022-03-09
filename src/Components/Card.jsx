import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {
  render() {
    const { name, id } = this.props;
    console.log(name);
    console.log(id);
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `album/${id}` }
        >
          { name }
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
};

export default Card;
