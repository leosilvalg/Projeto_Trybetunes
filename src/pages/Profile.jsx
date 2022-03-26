import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: {},
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userResults = await getUser();
    this.setState({
      loading: false,
      user: userResults,
    });
  }

  render() {
     const { loading, user } = this.state;
     console.log(user);
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading 
            ? <Loading />
            : (
              <>
                <Link to="/profile/edit">Editar perfil</Link>
                <img src={ user.image } alt={ user.name } data-testid="profile-image" />
                <p>{ user.name }</p>
                <p>{ user.email }</p>
                <p>{ user.description }</p>
              </>
            )
        }
      </div>
    );
  }
}

export default Profile;
