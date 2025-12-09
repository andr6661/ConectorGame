import React, { useState } from "react";
import "./rebus.scss";
import cardImage from "../../assets/wires/fonRebus.webp";

interface RebusPanelProps {
    solved: boolean[];
    onSolve: (index: number) => void;
    modalOpen: boolean;
    setModalOpen: (val: boolean) => void;
}

const rebuses = [
    { question: "Ребус 1", answer: "Ответ 1", pinNumber: 1, pinLabel: "оранжево-жёлтый" },
    { question: "Ребус 2", answer: "Ответ 2", pinNumber: 2, pinLabel: "желтый" },
    { question: "Ребус 3", answer: "Ответ 3", pinNumber: 3, pinLabel: "зелено-белый" },
    { question: "Ребус 4", answer: "Ответ 4", pinNumber: 4, pinLabel: "синий" },
    { question: "Ребус 5", answer: "Ответ 1", pinNumber: 5, pinLabel: "сине-белый" },
    { question: "Ребус 6", answer: "Ответ 2", pinNumber: 6, pinLabel: "зеленый" },
    { question: "Ребус 7", answer: "Ответ 3", pinNumber: 7, pinLabel: "коричнево-белый" },
    { question: "Ребус 8", answer: "Ответ 4", pinNumber: 8, pinLabel: "коричневый" },
];

const RebusPanel: React.FC<RebusPanelProps> = ({
                                                   solved,
                                                   onSolve,
                                                   modalOpen,
                                                   setModalOpen,
                                               }) => {
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

    const renderRow = (indices: number[]) => (
        <div className="rebus-row">
            {indices.map(i => (
                <div
                    key={i}
                    className="rebus-card"
                    onClick={() => openRebus(i)}
                    style={{
                        backgroundImage: `url(${cardImage})`,
                    }}
                >
                    {solved[i] && (
                        <div className="pin-text">
                            {`PIN ${rebuses[i].pinNumber} -> ${rebuses[i].pinLabel}`}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="rebus-panel">
            {renderRow([0, 1, 2])}
            {renderRow([3, 4, 5])}
            <div className="rebus-row small">{renderRow([6, 7])}</div>

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
