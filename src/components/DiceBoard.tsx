import { useState } from "react";
import Dice from "./Dice";

type DiceType = {
    value: number;
    held: boolean;
}

const DiceBoard = () => {
    const [dice, setDice] = useState<DiceType[]>(() =>
        Array.from({length: 5}, ()=> ({
            value: Math.ceil(Math.random() * 6),
            held: false,
        }))
    );

    return <div>DiceBoard</div>
}

export default DiceBoard;