import React from "react";
import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  );
}
export default Spinner;