import React from "react";
import styles from "./new-password.module.scss";

const NewPassword = () => {
  return (
    <div>
      <div className={styles.resetPasswordContainer}>
        <h2>パスワードをリセットする</h2>
      </div>
    </div>
  );
};

export default NewPassword;
