import React, { Component } from "react";
import s from "./Header.module.scss";

import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import FirebaseContext from "../../context/firebaseContext";

class Header extends Component {
  handleLogout = () => {
    const { logout } = this.context;
    logout();
  };

  render() {
    const { logoSrc, title } = this.props;
    return (
      <header className={s.header}>
        {logoSrc && (
          <a href="/" className={s.logo}>
            <img src={logoSrc} alt="" />
          </a>
        )}
        {title && <h1 className={s.header__title}>{title}</h1>}
        <div className={s.header__nav}>
          <Button
            icon={<LogoutOutlined />}
            onClick={this.handleLogout}
            ghost 
            size="large"
          >
            Выйти
          </Button>
        </div>
      </header>
    );
  }
}

Header.contextType = FirebaseContext;

export default Header;
