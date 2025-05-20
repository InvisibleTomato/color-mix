import React from "react";
import styles from "./AuthButton.module.scss";

type AuthButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
};

const AuthButton: React.FC<AuthButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button
      className={`${styles.authButton} ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default AuthButton;
