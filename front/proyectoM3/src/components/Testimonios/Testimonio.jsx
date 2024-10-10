import styles from "./Testimonios.module.css";
// eslint-disable-next-line react/prop-types
const Testimonios = ({ img, name, description }) => {
  return (
    <div className={styles.cartaTestimonio}>
      <img src={img} alt={name} className={styles.img} />
      <div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Testimonios;
