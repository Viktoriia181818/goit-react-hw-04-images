import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Api } from './Api/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

export const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentSearch, setCurrentSearch] = useState('')
  const [pageNum, setPageNum] = useState(1)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalImg, setModalImg] = useState('')
  const [modalAlt, setModalAlt] = useState('')
  
  const handleSubmit = async e => {
    e.preventDefault();
    // setIsLoading({ isLoading: false });
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return toast.error('🦄 Please enter the text!');
    } else {
    setIsLoading({ isLoading: true });
    }
    
    const response = await  Api(inputForSearch.value, 1);
    setImages(response);
    setIsLoading(false);
    setCurrentSearch(inputForSearch.value);
    setPageNum(1);
     
  };

  const handleClickMore = async () => {
    const response = await  Api(
      currentSearch,
      pageNum + 1
    );
    setImages([...images, ...response]);
    setPageNum(pageNum + 1);
  };

  const handleImageClick = e => {
    setModalImg(e.target.src);
    setModalAlt(e.target.alt);
    setModalIsOpen(true);
  };
  

  const handleModalClose = () => {
    setModalIsOpen(false);
    setModalImg('');
    setModalAlt('');
  };
  
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={handleSubmit} />
            <ImageGallery
              onImageClick={handleImageClick}
              images={images}
            />
            {images.length > 0 ? (
              <Button onClick={handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {modalIsOpen ? (
          <Modal
            src={modalImg}
            alt={modalAlt}
            handleClose={handleModalClose}
          />
        ) : null}
        <ToastContainer />
      </div>
    );
  
}