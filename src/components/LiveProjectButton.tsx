interface LiveProjectButtonProps {
  onCustomClick?: string;
}

const links: Record<string, string> = {
  '01': 'https://sagniksengupta24.github.io/Quantum-TicTacToe/',
  '02': 'https://sagniksengupta.vercel.app',
  '03': 'https://sagniksengupta24.github.io/nexusdev/',
  '04': 'https://sagniksengupta.vercel.app'
};

export const LiveProjectButton = ({ onCustomClick }: LiveProjectButtonProps) => {
  const handleClick = () => {
    if (onCustomClick && links[onCustomClick]) {
      window.open(links[onCustomClick], '_blank');
    }
  };

  return (
    <button
      className="btn-live"
      onClick={handleClick}
    >
      Live Project
    </button>
  );
};
