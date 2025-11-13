import '../styles/dice.css'

type DiceProps = {
    value: number;
    held: boolean;
    onClick: () => void;
}

const Dice = ({value, held, onClick}: DiceProps) => {
    return (
        <button
            onClick={onClick}
            className={`dice-face ${held ? "held" : ""}`}
        >
            {value}
        </button>
    );
}

export default Dice