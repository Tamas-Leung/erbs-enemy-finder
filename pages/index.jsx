import styles from "../styles/components/Home.module.scss";
import SearchBar from "../components/SearchBar";
import Layout from "../components/Layout";

export default function Home() {
    return (
        <div className={styles.home_layout} >
            <h1 className={styles.title}>
                ERBS <span className={styles.red}>Rival</span>
            </h1>

            <h2 className={styles.subtitle}>
                Find who killed you the most in the past{" "}
                <span className={styles.red}>3-ish months</span>.
            </h2>

            <div className={styles.search_bar}>
               <SearchBar />
            </div>
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
