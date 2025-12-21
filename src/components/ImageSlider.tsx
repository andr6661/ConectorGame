import React, { useState, useRef, useEffect } from 'react'
import ImageModal from './ImageModal'
import './ImageSlider.scss'

interface ImageSliderProps {
    images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const [hasSwiped, setHasSwiped] = useState(false)
    const slideRef = useRef<HTMLDivElement>(null)

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
        if (!hasSwiped) {
            setIsModalOpen(true)
        }
    }

    useEffect(() => {
        if (hasSwiped) {
            const timer = setTimeout(() => {
                setHasSwiped(false)
            }, 300)
            return () => clearTimeout(timer)
        }
    }, [hasSwiped])

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        setHasSwiped(false)
        setDragStartX(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        e.preventDefault()
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!isDragging || !dragStartX) return

        const touchEndX = e.changedTouches[0].clientX
        const diff = dragStartX - touchEndX
        const minSwipeDistance = 30

        if (Math.abs(diff) > minSwipeDistance) {
            setHasSwiped(true)
            if (diff > 0) {
                goToNext()
            } else {
                goToPrev()
            }
        }

        setIsDragging(false)
        setDragStartX(0)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setHasSwiped(false)
        setDragStartX(e.clientX)
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
    }

    const handleMouseUp = (e: React.MouseEvent) => {
        if (!isDragging || !dragStartX) return

        const mouseUpX = e.clientX
        const diff = dragStartX - mouseUpX
        const minSwipeDistance = 30

        if (Math.abs(diff) > minSwipeDistance) {
            setHasSwiped(true)
            if (diff > 0) {
                goToNext()
            } else {
                goToPrev()
            }
        }

        setIsDragging(false)
        setDragStartX(0)
    }

    return (
        <>
            <div className="image-slider">
                <div className="zoom-hint">
                    <div className="hint-main">Кликните на изображение для увеличения</div>
                    <div className="hint-secondary">Перетащите влево/вправо для смены слайдов</div>
                </div>

                <div className="slider-container">
                    <button
                        className="nav-button prev-button"
                        onClick={goToPrev}
                        aria-label="Предыдущий слайд"
                    >
                        ‹
                    </button>

                    <div
                        className={`slide-wrapper ${isDragging ? 'dragging' : ''}`}
                        ref={slideRef}
                        onClick={handleImageClick}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsDragging(false)}
                    >
                        <div className="slide">
                            <img
                                src={images[currentIndex]}
                                alt={`Документ ${currentIndex + 1}`}
                                className="slide-image"
                            />
                            <div className="image-overlay-hint">
                                Нажмите для увеличения
                            </div>
                        </div>
                        <div className="swipe-hint left-hint">‹</div>
                        <div className="swipe-hint right-hint">›</div>
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