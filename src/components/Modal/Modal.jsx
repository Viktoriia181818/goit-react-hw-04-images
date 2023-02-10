import propTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({src, alt, handleClose}) => {
    useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  })

  useEffect(() => {
    window.removeEventListener('keydown', handleKeyDown);
  })
   const  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.handleClose();
    }
  };

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