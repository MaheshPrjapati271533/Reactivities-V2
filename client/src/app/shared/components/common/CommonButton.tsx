import { Button, type ButtonProps } from "@mui/material";

type ButtonType = 'cancel' | 'submit' | 'reset' | 'delete';

type Props = {
    label: string;
    type?: ButtonType;
    onClick?: () => void;
    style?: React.CSSProperties;
};

export default function CommonButton({ label, type, onClick, style }: Props) {
    const getButtonPropsByType = (): Partial<ButtonProps> => {
        switch (type) {
            case 'cancel':
                return { color: 'inherit', type: 'button' };
            case 'submit':
                return { color: 'success', variant: 'contained', type: 'submit'  };
            case 'reset':
                return { color: 'warning', variant: 'text', type: 'reset' };
            case 'delete':
                return { color: 'error', variant: 'contained', type: 'button' };
            default:
                return { type: 'button' };
        }
    };

    const typeProps = getButtonPropsByType();

    return (
        <Button onClick={onClick} style={style} {...typeProps}>
            {label}
        </Button>
    );
}