import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import './App.scss'

function App() {
    const [currentPage, setCurrentPage] = useState<'home' | 'game'>('home')

    const handleBack = () => {
        setCurrentPage('home')
    }

    const handleStartGame = () => {
        setCurrentPage('game')
    }

    return (
        <div className="app">
            {currentPage === 'home' ? (
                <HomePage onStartGame={handleStartGame} />
            ) : (
                <GamePage onBack={handleBack} />
            )}
        </div>
    )
}

export default App