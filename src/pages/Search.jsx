import React from 'react';
import Header from '../Components/Header';

const MAX_NAME_ARTIST_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ name: value });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            placeholder="Digite o nome do artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ name.length < MAX_NAME_ARTIST_LENGTH }
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
