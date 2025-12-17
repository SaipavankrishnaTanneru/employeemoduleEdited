import React from "react";
import styles from "./NavTabsWidget.module.css";

const NavTabsWidget = ({ options = [], value, onChange }) => {
  return (
    <div className={styles.container}>
      {options.map((opt) => {
        const isActive = value === opt.value;

        return (
          <div
            key={opt.value}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </div>
        );
      })}
    </div>
  );
};

export default NavTabsWidget;
