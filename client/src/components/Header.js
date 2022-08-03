import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //** Renders the HTML **/
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/courses">Courses</Link></h1>
                <nav>
                {/* If there is an authorized user, a Welcome span and Sign Out button appear. */}
                {/* If there is not an authorized user, a Sign In and Sign Up button appear. */}
                    {authUser ?
                        <ul className='header--signedin'>
                            <React.Fragment>
                                <li><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>
                                <li><Link to="/signout">Sign Out</Link></li>
                            </React.Fragment>
                        </ul>
                    : 
                        <ul className='header--signedout'>
                            <React.Fragment>
                                <li><Link className="signup" to="/signup">Sign Up</Link></li>
                                <li><Link className="signin" to="/signin">Sign In</Link></li>
                            </React.Fragment>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
  }
};