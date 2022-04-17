import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../styles/components/SearchBar.module.scss";

const SearchBar = () => {
    const router = useRouter();
    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        const nickname = e.target.searchBarInput.value;

        if (nickname) router.push(`/profile/${nickname}`);
    }, [router]);

    return (
        <form className={styles.searchBar} onSubmit={handleSubmit}>
            <input
                name="searchBarInput"
                className={styles.searchBarInput}
                placeholder={"Search tag..."}
            />
            <button type="submit" className={styles.searchBarButton}>
                <FaSearch className={styles.searchBarButtonIcon} />
            </button>
        </form>
    );
};

export default SearchBar;
