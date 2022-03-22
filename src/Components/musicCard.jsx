import React from 'react';
import propTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorite: false,
      check: false,
    };
  }

  handleFavorite = async () => {
    const { trackId } = this.props;
    this.setState({ check: true });

    const data =  await addSong(trackId);
    this.setState({ check: false, favorite: true });

    return data;
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check, favorite } = this.state;
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
          check
            ? <Loading />
            : (
              <label htmlFor="favoriteMusic">
                Favorita
                <input
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favoriteMusic"
                  type="checkbox"
                  checked={ favorite }
                  onChange={ () => { this.handleFavorite() } }
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
