import React from "react";
import styles from "./AddFieldWidget.module.css";
import removeIcon from "../../assets/icons/legendcrossicon.svg";

const AddFieldWidget = ({
  index,
  title,
  enableFieldset = true,
  showSimpleTitle = true,
  forceFieldset = false,
  onClear,
  onRemove,
  children,
}) => {
  const isFirst = index === 0;

  /* ---------------- SIMPLE BLOCK*/
  if (isFirst && !forceFieldset) {
    return (
      <div className={styles.simpleBlock}>
        {showSimpleTitle && (
          <>
            <h3 className={styles.simpleTitle}>{title}</h3>
            <div className={styles.simpleLine}></div>
          </>
        )}

        <div className={styles.simpleContent}>{children}</div>
      </div>
    );
  }

  /* ---------------- FIELDSET BLOCK  */
  return (
    <fieldset className={styles.fieldsetBox}>
      <legend className={styles.legendWrapper}>
        <div className={styles.legendRow}>
          <div className={`${styles.legendTag} ${styles.activeTag}`}>
            {title}
          </div>

          <div className={styles.actions}>
            <div
              className={styles.legendTag}
              onClick={() => onClear(index)}
            >
              Clear
            </div>

            <img
              src={removeIcon}
              className={styles.legendCross}
              onClick={() => onRemove(index)}
              alt="remove"
            />
          </div>
        </div>
      </legend>

      <div className={styles.fieldsetContent}>{children}</div>
    </fieldset>
  );
};

export default AddFieldWidget;
