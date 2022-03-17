import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.inputChange = this.inputChange.bind(this);
  }

  async inputChange(tracks) {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    if (favoriteSongs.some((track) => track.trackId === tracks.trackId)) {
      await removeSong(tracks);
    } await addSong(tracks);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, getFavotite } = this.props;
    const { loading } = this.state;
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
                  checked={ getFavotite }
                  onChange={ () => this.inputChange(this.props) }
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
