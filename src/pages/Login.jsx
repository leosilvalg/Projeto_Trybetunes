import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

const MAX_NAME_LENGTH = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      redirect: false,
    };

    this.submitButton = this.submitButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.setState({ name: value });
  }

  async submitButton() {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({
      isLoading: false,
      redirect: true,
    });
  }

  render() {
    const { name, isLoading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        {
          isLoading
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                  data-testid="login-name-input"
                  placeholder="Digite seu nome"
                />
                <button
                  type="button"
                  data-testid="login-submit-button"
                  onClick={ this.submitButton }
                  disabled={ name.length < MAX_NAME_LENGTH }
                >
                  Enter
                </button>
              </form>
            )
        }
        {
          redirect ? <Redirect to="search" /> : ''
        }
      </div>
    );
  }
}

export default Login;
