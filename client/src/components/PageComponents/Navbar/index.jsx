import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutFunc } from "../../../actions/userActions";
import "bootstrap/dist/css/bootstrap.css"; // this is needed to override existing CSS styling

class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
		super(props);
		this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
		e.preventDefault();

    this.props.logoutFunc();
    this.props.history.push('/');
	}

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-teal mb-4">
        <div className="container">
          {/* <div className="logo">
            <Link to={'/'} className="logo--link">
              <img
                className="logo--image"
                alt=""
                src="https://i.imgur.com/L2kMZ75.png"
              />
            </Link>
          </div> */}
          <div className='navbar-nav'>
            <a href='/' className='nav-link font-weight-bold'>Sustainable Food Economy and Enterprise Knowledge Base</a>
          </div>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={'/browse'} className="nav-link font-weight-bold">Browse</Link>
              </li>
              <li className="nav-item font-weight-bold">
                <Link to={'/about'} className="nav-link">About</Link>
              </li>
              <li className="nav-item font-weight-bold">
              <Link to={'/map'} className="nav-link">Map</Link>
              </li>
            </ul>
            { isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown mr-3">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-user" /> { user.username }
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item">
                    <i className="fa fa-user-circle" />
                    <a href={ `/profile/${user.username}` }> Profile </a>
                  </a>
                  <a className="dropdown-item">
                    <i className="fa fa-gear" /> Settings
                  </a>
                  <a className="dropdown-item">
                    <i className="fa fa-bell" />
                    <a href="/notifications"> Notifications </a>
                  </a>
                  {(user.role == 'Administrator') ? (
                    <a className="dropdown-item">
                      <i className="fa fa-address-book" />
                      <a href="/tempadminpage"> Admin Page </a>
                    </a>
                  ): null }
                  <a className="dropdown-iUser Profiletem dropdown-item">
                    <i className="fa fa-sign-out" />
                    <a href='#' onClick={this.onLogout}> Logout </a>
                  </a>
                </div>
              </li>
            </ul>
            ) : (
              <div className='navbar-nav'>
                <a className="nav-link font-weight-bold" href="/login">
                  Login
                </a>
              </div>
            ) }
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(
  mapStateToProps,
  { logoutFunc }
)(Navbar));
