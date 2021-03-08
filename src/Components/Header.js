import React from 'react';
import Logo from '../assets/imgs/phone.png';

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="header-wrapper">
          <div className="header-row">
            <img className="logo" src={Logo} alt="contact_logo" />
            <p>My UT Phone Book</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
