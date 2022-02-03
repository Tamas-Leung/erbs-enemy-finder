import styles from "../styles/components/Home.module.scss";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

export default function Home() {
    return (
        <>
            <h1 className={styles.title}>
                Find your ERBS <span className={styles.red}>Rival</span>
            </h1>

            <h2 className={styles.subtitle}>
                Check who killed you the most in the past{" "}
                <span className={styles.red}>2 months*</span>.
            </h2>

            <SearchBar />
        </>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
