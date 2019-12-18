import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/home"
              style={{
                fontFamily: "monospace",
                marginLeft:"30px"
              }}
              className="col s5 brand-logo black-text"
              >
              EXPLORE
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">

            <li><Link to="/home" style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px"
              }} className="btn btn-medium waves-effect waves-light btn-flat hoverable">
                Home
            </Link></li>

            <li><Link to="/drag_drop" style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px"
              }} className="btn btn-medium waves-effect waves-light btn-flat hoverable">
                Drag & Drop
            </Link></li>

            <li><Link to="/contact" style={{ width: "150px", borderRadius: "3px", letterSpacing: "1.5px"
              }} className="btn btn-medium waves-effect waves-light btn-flat hoverable">
                Contact
            </Link></li>

            <li><button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                margintop:"16px"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-medium waves-effect waves-light btn-flat hoverable"
            >
              Logout
            </button></li>

            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
