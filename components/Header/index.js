import React from "react";
import Menu from "../Menu.js";
import { WithAuth } from "../With-auth/index.js";
import styles from "./styles.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Menu />
    </div>
  );
};

export default WithAuth(Header);
