import propTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({src, alt, handleClose}) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[handleClose]);


    // const { src, alt, handleClose } = this.props;

    return (
       <div className={css.Overlay} onClick={handleClose}>
       <div className={css.Modal}>
      <img src={src} alt={alt} />
        </div>
      </div>
    );
  }

 

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};

export default Modal;