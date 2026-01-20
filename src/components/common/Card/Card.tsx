import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  icon?: string;
  image?: string;
  heading: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ icon, image, heading, value }) => {
  // Format number with comma separation
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon ? (
          <img src={icon} alt="" className={styles.icon} />
        ) : image ? (
          <img src={image} alt="" className={styles.icon} />
        ) : null}
      </div>
      <h3 className={styles.heading}>{heading}</h3>
      <div className={styles.value}>{formatNumber(value)}</div>
    </div>
  );
};

export default Card;
