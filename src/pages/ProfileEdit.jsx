import React from 'react';
import Loading from '../Components/Loading';
import Header from '../Components/Header';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
      btnDissabled: false,
    };
  }

  componentDidMount() {
    getUser()
      .then(user => {
        this.setState({
          loading: false,
          redirect: false,
          name: user.name,
          email: user.email,
          description: user.description,
          image: user.image,
        });
      });
  }
  

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value,}, () => this.validate());
  }

  validate = () => {
    const { name, email, description, image } = this.state;
    const inputArray = [name, email, description, image];
    if (inputArray.some(input => input === '')) {
      this.setState({ btnDissabled: true });
    } else {
      this.setState({ btnDissabled: false });
    }
  }

  updateInfo = () => {
    this.setState ({ loading: true });
    const { name, email, description, image } = this.state;
    const user = {
      name,
      email,
      description,
      image,
    };
    updateUser(user);
    this.setState({ redirect: true, loading: false });
  }
  
  render() {
    const { loading, name, email, description, image, btnDissabled, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/profile" />
    }

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <>
                <section>
                  <form>
                    <input
                      type="text"
                      name="name"
                      value={ name }
                      data-testid="edit-input-name"
                      onChange={ this.handleChange }
                    />
                    <input
                    type="email"
                    name="email"
                    value={ email }
                    data-testid="edit-input-email"
                    onChange={ this.handleChange }
                    />
                    <textarea
                    type="text"
                    name="description"
                    value={ description }
                    data-testid="edit-input-description"
                    onChange={ this.handleChange }
                    />
                    <input
                    type="url"
                    name="image"
                    value={ image }
                    data-testid="edit-input-image"
                    onChange={ this.handleChange }
                    />
                    <button
                    type="button"
                    data-testid="edit-button-save"
                    disabled={ btnDissabled }
                    onClick={ this.updateInfo }
                    >
                      Salvar
                    </button>
                  </form>
                </section>
              </>
            )
        }
      </div>
    );
  }
}

export default ProfileEdit;
