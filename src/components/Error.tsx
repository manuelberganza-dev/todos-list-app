import { ReactNode } from "react";
import styles from "./Error.module.css"

type ErrorProps = {
    children: ReactNode
}

export default function Error({children}: ErrorProps) {
    return (
        <div className={styles.error}>
            {children}
        </div>
    )
}