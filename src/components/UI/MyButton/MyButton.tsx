import {} from 'react';
import classes from './MyButton.module.scss';

interface MyButtonProps {
  className?: string;
  style?: React.CSSProperties;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  style,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={classes.myButton}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MyButton;
