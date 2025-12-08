import React, { useState } from "react";
import "./rebus.scss";

interface RebusPanelProps {
    solved: boolean[];
    onSolve: (index: number) => void;
    modalOpen: boolean;
    setModalOpen: (val: boolean) => void;
}

const rebuses = [
    { question: "Ребус 1", answer: "Ответ 1" },
    { question: "Ребус 2", answer: "Ответ 2" },
    { question: "Ребус 3", answer: "Ответ 3" },
    { question: "Ребус 4", answer: "Ответ 4" },
    { question: "Ребус 5", answer: "Ответ 1" },
    { question: "Ребус 6", answer: "Ответ 2" },
    { question: "Ребус 7", answer: "Ответ 3" },
    { question: "Ребус 8", answer: "Ответ 4" },
];

const RebusPanel: React.FC<RebusPanelProps> = ({ solved, onSolve, modalOpen, setModalOpen }) => {
    const [activeRebus, setActiveRebus] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const openRebus = (index: number) => {
        setActiveRebus(index);
        setInputValue("");
        setErrorMessage("");
        setModalOpen(true);
    };

    const closeModal = () => {
        setActiveRebus(null);
        setModalOpen(false);
        setErrorMessage("");
    };

    const submitAnswer = () => {
        if (activeRebus === null) return;

        if (inputValue.trim().toLowerCase() === rebuses[activeRebus].answer.toLowerCase()) {
            onSolve(activeRebus);
            closeModal();
        } else {
            setErrorMessage("Посмотри внимательно");
        }
    };

    return (
        <div className="rebus-panel">
            {/* Ряды ребусов */}
            <div className="rebus-row">
                {[0, 1, 2].map(i => (
                    <div key={i} className="rebus-card" onClick={() => openRebus(i)}>
                        {solved[i] ? rebuses[i].answer : "Нажми, чтобы решить"}
                    </div>
                ))}
            </div>

            <div className="rebus-row">
                {[3, 4, 5].map(i => (
                    <div key={i} className="rebus-card" onClick={() => openRebus(i)}>
                        {solved[i] ? rebuses[i].answer : "Нажми, чтобы решить"}
                    </div>
                ))}
            </div>

            <div className="rebus-row small">
                {[6, 7].map(i => (
                    <div key={i} className="rebus-card" onClick={() => openRebus(i)}>
                        {solved[i] ? rebuses[i].answer : "Нажми, чтобы решить"}
                    </div>
                ))}
            </div>

            {/* Модалка */}
            {activeRebus !== null && modalOpen && (
                <>
                    <div className="blur-background" onClick={closeModal}></div>
                    <div className="rebus-modal">
                        <div className="rebus-content" onClick={e => e.stopPropagation()}>
                            <button className="close-btn" onClick={closeModal}>&times;</button>
                            <h2>{rebuses[activeRebus].question}</h2>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Введите ответ"
                                className="rebus-input"
                            />
                            <button className="solve-btn" onClick={submitAnswer}>Проверить</button>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default RebusPanel;
