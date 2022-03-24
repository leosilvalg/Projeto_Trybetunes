import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
      music: [],
      fav: [],
    };
  }

  componentDidMount() {
    const { music: { trackId } } = this.props;
    const favoriteSong = this.favorites(trackId);
    if (favoriteSong) {
      this.setState({ favorite: true });
    }
  }

  getFavs = async () => {
    const { music } = this.state;
    this.setState((prevState) => ({
      loading: true,
      favorite: !prevState.favorite,
    }), async () => {
      const { favorite } = this.state;
      if (favorite) {
        await addSong(music);
      } else {
        await removeSong(music);
      }
      this.setState({
        loading: false,
      });
    })
  }

  favorites = (teste) => {
    const { favSong } = this.props;
    const testando = favSong.some(fav => fav.trackId === teste);
    return testando;
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        {
          loading
            ? <Loading />
            : (
              <label htmlFor="favoriteMusic">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favoriteMusic"
                  type="checkbox"
                  checked={ favorite }
                  onChange={ this.getFavs }
                />
              </label>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
};

export default MusicCard;
