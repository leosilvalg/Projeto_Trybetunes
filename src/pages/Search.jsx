import React from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import Card from '../Components/Card';

const MAX_NAME_ARTIST_LENGTH = 2;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      artistResult: '',
      loading: false,
      albuns: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCLick = this.handleCLick.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ name: value });
  }

  async handleCLick() {
    this.setState({ loading: true });
    const { name } = this.state;
    const API_RESULT = await searchAlbumsAPI(name);
    this.setState({
      artistResult: name,
      name: '',
      albuns: API_RESULT,
      loading: false,
    });
  }

  render() {
    const { name, loading, albuns, artistResult } = this.state;
    if (loading) return <Loading />;
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
            onClick={ this.handleCLick }
          >
            Search
          </button>
        </form>
        {
          albuns.length <= 0
            ? <p>Nenhum álbum foi encontrado</p>
            : (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { `${artistResult}` }
                </p>
                <div>
                  {
                    albuns.map(({ collectionId, collectionName }) => (<Card
                      key={ collectionId }
                      name={ collectionName }
                      id={ collectionId }
                    />))
                  }
                </div>
              </div>
            )
        }
      </div>
    );
  }
}

export default Search;
