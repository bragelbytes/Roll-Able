import { useEffect, useState } from "react";
import Dice from "./Dice";

type DiceType = {
    value: number;
    held: boolean;
}

const DiceBoard = () => {
    const [inputValue, setInputValue] = useState<string>('');

    const [dice, setDice] = useState<DiceType[]>(() =>
        Array.from({length: 5}, ()=> ({
            value: Math.ceil(Math.random() * 6),
            held: false,
        }))
    );

    const updateDiceAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        const newCount = Number(inputValue);
        if(!isNaN(newCount) && newCount > 0){
            setDice(
                Array.from({length: newCount}, () => ({
                    value: Math.ceil(Math.random() * 6),
                    held: false,
                }))
            );
        }
    }, [inputValue])

    const rollDice = () => {
        setDice((previous) => 
            previous.map((die) => 
                die.held ? die : {...die, value: Math.ceil(Math.random() * 6)}
            )
        )
    }

    const toggleHold = (index: number) => {
        setDice((previous) =>
            previous.map((die, i) =>
                i === index ? {...die, held: !die.held} : die
            )
        );
    }

    return (
        <div>
            <input 
                type="text"
                value={inputValue}
                onChange={updateDiceAmount}
            />

            <button onClick={rollDice} style={{ marginBottom: "1rem" }}>
                Roll
            </button>

            <div
                style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "1rem",
                }}
            >
                {dice.map((die, index) => (
                <Dice
                    key={index}
                    value={die.value}
                    held={die.held}
                    onClick={() => toggleHold(index)}
                />
                ))}
            </div>
        </div>
    )
}

export default DiceBoard;