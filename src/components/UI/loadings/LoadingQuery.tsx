import React from 'react'
import styles from './loading.module.css'


function LoadingQuery({ active }: { active: boolean }) {
    return (
        <>
            {active && <div className={styles.centerLoading}>
                <div
                    className={styles.loadingQuery}
                />
                <span className={styles.spanLoading}>Cargando</span>
            </div>}
        </>
    )
}

export default LoadingQuery