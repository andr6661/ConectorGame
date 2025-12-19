import React, { useState } from 'react'
import ImageModal from '../components/ImageModal'
import './HomePage.scss'

interface HomePageProps {
    onStartGame: () => void
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="home-page">
            <div className="main-container">
                <header className="header">
                    <h1>Игра: "Заполни заявление"</h1>
                    <p className="subtitle">Правильно заполните все поля в заявлении на пенсию</p>
                </header>

                <div className="instructions-card">
                    <h2>Как играть:</h2>
                    <ol>
                        <li>Изучите образец заявления (нажмите "Начать игру")</li>
                        <li>На игровой странице изучите дополнительные документы в слайдере слева</li>
                        <li>Найдите на бланке заявления справа пропущенные поля</li>
                        <li>Заполните все пропуски правильной информацией</li>
                        <li>Нажмите "Проверить ответы"</li>
                        <li>Исправьте ошибки, если они есть</li>
                    </ol>
                </div>

                <button className="start-button" onClick={onStartGame}>
                    Начать игру
                </button>

                <footer className="footer">
                    <p>Игра разработана для обучения заполнению документов</p>
                </footer>
            </div>

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageUrl="https://via.placeholder.com/600x800?text=Образец+заявления+здесь"
            />
        </div>
    )
}

export default HomePage