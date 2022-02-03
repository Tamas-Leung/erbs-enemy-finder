import Head from "next/head";
import styles from "../styles/components/Layout.module.scss";

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>ERBS Rival Finder</title>
                <meta
                    name="ERBS Rival Finder"
                    content="Find who killed you the most in Eternal Return Black Survival"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>{children}</main>
            <footer className={styles.footer}>
                <div>
                    Created By MacTal, Contact on Discord at TheAsianLife#1503
                </div>
            </footer>
        </div>
    );
}
