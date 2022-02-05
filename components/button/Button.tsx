import { DetailedHTMLProps, FC, ButtonHTMLAttributes } from "react"
import styles from "./Button.module.scss"

type Button = Omit<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	"disabled" & "style"
>

interface P {
	loading?: boolean
}

export const Button: FC<P & Button> = ({ loading = false, children, ...props }) => {
	return (
		<button className={styles.container} disabled={loading} {...props}>
			{children}
		</button>
	)
}

Button.displayName = "Button"

export default Button
