import React from 'react';
import propTypes from 'prop-types';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/musicCard';

import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      musics: [],
      musicList: [],
      fav: [],
    };
    this.getMusic = this.getMusic.bind(this);
    this.getFav = this.getFav.bind(this);
  }

  componentDidMount() {
    this.getMusic();
    this.getFav();
  }

  async getMusic() {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const musicResults = await getMusics(id);
    const songs = musicResults.filter((track) => track.trackId); // Adicionei esse filtro, do contrario, era renderizado um player a mais, relacionado ao primeiro objeto do array
    console.log(musicResults);
    this.setState({
      loading: false,
      musics: musicResults[0],
      musicList: songs,
    });
  }

  getFav() {
    this.setState({
      loading: true,
    }, async () => {
      const data = await getFavoriteSongs();
      this.setState({
        loading: false,
        fav: [...await data],
      });
    });
  }

  render() {
    const { loading, musics, musicList, fav } = this.state;
    console.log(musics);

    return (
      <>
        <div data-testid="page-album">
          <Header />
          <h1 data-testid="artist-name">{musics.artistName}</h1>
          <h2 data-testid="album-name">{musics.collectionName}</h2>
        </div>
        {
          loading
            ? <Loading />
            : (
              musicList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  getFavotite={ fav.some((song) => song.trackId === music.trackId) }
                  music={ music }
                />))
            )
        }
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.objectOf(propTypes.string),
  }).isRequired,
};

export default Album;
