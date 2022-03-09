import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/musicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musics: [],
      musicList: [],
    };
    this.getMusic = this.getMusic.bind(this);
  }

  componentDidMount() {
    this.getMusic();
  }

  async getMusic() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musicResults = await getMusics(id);
    this.setState({
      loading: false,
      musics: musicResults[0],
      musicList: musicResults,
    });
  }

  render() {
    const { loading, musics, musicList } = this.state;
    console.log(musics);

    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <h1 data-testid="artist-name">{musics.artistName}</h1>
                <h2 data-testid="album-name">{musics.collectionName}</h2>
                <MusicCard musics={ musicList } />
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.string),
  }).isRequired,
};

export default Album;
