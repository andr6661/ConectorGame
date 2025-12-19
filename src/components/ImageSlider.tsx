import React, { useState } from 'react'
import ImageModal from './ImageModal'
import './ImageSlider.scss'

interface ImageSliderProps {
    images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const handleImageClick = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className="image-slider">
                <div className="slider-container">
                    <button
                        className="nav-button prev-button"
                        onClick={goToPrev}
                        aria-label="Предыдущий слайд"
                    >
                        ‹
                    </button>

                    <div className="slide-wrapper">
                        <div className="slide">
                            <img
                                src={images[currentIndex]}
                                alt={`Документ ${currentIndex + 1}`}
                                className="slide-image"
                                onClick={handleImageClick}
                            />
                        </div>
                    </div>

                    <button
                        className="nav-button next-button"
                        onClick={goToNext}
                        aria-label="Следующий слайд"
                    >
                        ›
                    </button>
                </div>

                <div className="indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl={images[currentIndex]}
            />
        </>
    )
}

export default ImageSlider