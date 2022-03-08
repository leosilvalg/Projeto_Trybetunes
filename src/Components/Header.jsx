import React from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };
    this.getUserName = this.getUserName.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <p data-testid="header-user-name">{ user.name }</p>
      </header>
    );
  }
}

export default Header;
