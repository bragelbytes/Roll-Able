
type DiceProps = {
    value: number;
    held: boolean;
    onClick: () => void;
}

const Dice = ({value, held, onClick}: DiceProps) => {
    return (
        <button
            onClick={onClick}
            style={{
                width: "60px",
                height: "60px",
                fontSize: "1.5rem",
                borderRadius: "8px",
                backgroundColor: held ? "#ffd54f" : "#fff",
                border: "2px solid #000",
                cursor: "pointer",
            }}
        >
            {value}
        </button>
    );
}

export default Dice