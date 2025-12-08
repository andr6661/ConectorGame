import React from 'react'
import ReactDOM from 'react-dom/client'
import "./style.scss";


// Твой главный компонент игры
import TwistedPairGame from '././TwistedPairGame/components/Game'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TwistedPairGame />
    </React.StrictMode>,
);
