/* import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function UserSignIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'email') {
            setEmail(value);
        } 
        if (name === 'password') {
            setPassword(value);
        }
    }

    const submit = () => {

    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <form onChange={submit}>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={change} />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={change} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='/courses';">Cancel</button>
                </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
        </div>
    </main>
    );
} */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      email,
      password,
      errors,
    } = this.state;

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <label htmlFor="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={this.change} />
                            <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" value={password} onChange={this.change} />
                        </React.Fragment>
                    )} />

                {/* <form onSubmit={this.submit}>
                <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={this.change} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} onChange={this.change} />
                    <button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.cancel}>Cancel</button>
                </form> */}
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </main>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const {context} = this.props;
    const {from} = this.props.location.state || {from: {pathname: '/authenticated' }}
    const {email, password} = this.state;
    context.actions.signIn(email, password)
      .then(user => {
        if (user === null) {
          this.setState(()=> {
            return {errors: ['Sign-in was unsuccessful']}
          })
        } else {
          this.props.history.push(from);
          console.log(`SUCCESS! ${email} is now signed in!`);
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
  }

  cancel = () => {
    this.props.history.push('/');
  }
}
