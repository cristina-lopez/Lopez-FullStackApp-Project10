import React, { useState } from 'react';
//import Cookies from 'js-cookie';
//import Data from './Data';

export const Context = React.createContext(); //sets up provider and consumer

export const Provider = (props) => {

    const [courses, setCourses] = useState([]);

    const fetchCourses = () => {
        setCourses(() => {
            fetch('http://localhost:5000/api/courses')
                .then(res => res.json())
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                })
        });
    }

    const signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
          this.setState(() => {
            return {
              authenticatedUser: user,
            };
          });
          //const cookieOptions = {
          //  expires: 1 // 1 day
          //};
          //Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
        }
        return user;
    }

    const signOut = () => {
        this.setState({ authenticatedUser: null });
        //Cookies.remove('authenticatedUser');
    }

    return (
        <Context.Provider value={{
            courses,
            actions: {
                getCourses: fetchCourses,
                signIn: signIn,
                signOut: signOut
            }
        }}>
        {props.children}
      </Context.Provider>  
    );
}

    /* performFetch = () => {
        this.setState({
            courses: fetch('http://localhost:5000/api/courses')
                .then(res => res.json())
                .catch(error => {
                    console.log('Error fetching and parsing data', error);
                })
        })
    } */

    //const { authenticatedUser } = this.state;
    /* const value = {
        //authenticatedUser,
        data: this.data,
        actions: {
          //performFetch: this.performFetch,
          signIn: this.signIn,
          signOut: this.signOut
        },
      }; */

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