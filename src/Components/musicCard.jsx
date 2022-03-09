import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    console.log(musics);
    return (
      musics.map((music, index) => (
        index === 0
          ? null
          // (
          //   <div key={ music.artistId }>
          //     <h1 data-testid="artist-name">{music.artistName}</h1>
          //     <h2 data-testid="album-name">{music.collectionName}</h2>
          //   </div>
          // )
          : (
            <div key={ music.index }>
              <p>{ music.trackName }</p>
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
            </div>
          )))
    );
  }
}

MusicCard.propTypes = {
  musics: propTypes.arrayOf(propTypes.object).isRequired,
};

export default MusicCard;
