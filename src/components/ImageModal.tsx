import React from 'react'
import './ImageModal.scss'

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageUrl: string
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="image-modal-overlay" onClick={handleOverlayClick}>
            <div className="image-modal">
                <button className="close-button" onClick={onClose} aria-label="Закрыть">
                    ×
                </button>
                <div className="image-container">
                    <img
                        src={imageUrl}
                        alt="Увеличенное изображение документа"
                        className="modal-image"
                    />
                </div>
            </div>
        </div>
    )
}

export default ImageModal