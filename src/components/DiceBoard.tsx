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

    // any time input value changes add or subtract dice 
    // but keep current dice intact when possible
    useEffect(() => {
        const newCount = Number(inputValue);
        if(!isNaN(newCount) && newCount > 0){
            setDice((prevDice) => {
                const difference = newCount - prevDice.length;
                if(difference > 0){
                    // add more dice to current batch
                    const newDice = Array.from({length: difference}, () => ({
                        value: Math.ceil(Math.random() * 6),
                        held: false
                    }));
                    return [...prevDice, ...newDice];
                } else if(difference < 0) {
                    // remove dice from batch
                    return prevDice.slice(0, newCount);
                } else {
                    // do nothing
                    return prevDice;
                }
            });
        }
    }, [inputValue]);

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
        <>
            <div className="controls">
                <input 
                    type="number"
                    min={1}
                    max={20}
                    value={inputValue}
                    onChange={updateDiceAmount}
                    placeholder="number of dice you would like to roll"
                />

                <button onClick={rollDice} className="roll-button">
                    Roll
                </button>
            </div>

            <div>
                {dice.map((die, index) => (
                <Dice
                    key={index}
                    value={die.value}
                    held={die.held}
                    onClick={() => toggleHold(index)}
                />
                ))}
            </div>
        </>
    )
}

export default DiceBoard;