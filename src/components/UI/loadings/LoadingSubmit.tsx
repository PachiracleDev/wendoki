import React from "react";
import styles from "./loading.module.css";

function LoadingSubmit() {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.loading} />
		</div>
	);
}

export default LoadingSubmit;
