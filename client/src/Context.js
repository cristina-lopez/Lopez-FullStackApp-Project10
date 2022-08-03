import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: null,
    courses: []
  };

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');

    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    };
  }

  render() {
    const {authenticatedUser} = this.state;
    const courses = this.state;

    const value = {
      authenticatedUser,
      courses,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut
       }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password); // returns name and username
    if (user !== null) {
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState(() => {
      return {
        authenticatedUser: null,
      }
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

export default {withContext, Context}