import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/components/Profile.module.scss";
import Link from "next/link";
import { useState } from "react";

const Profile = ({
    userExists,
    rivals,
    start_date,
    end_date,
    update_date,
    game_count,
}) => {
    const router = useRouter();
    const { nickname } = router.query;
    const [amountShown, setAmountShown] = useState(5);

    const minWidth = 10;

    const increaseAmountShown = () => {
        setAmountShown(amountShown + 5);
    };

    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <a>
                    <h2>
                        ERBS <span className={styles.red}>Rival</span>
                    </h2>
                </a>
            </Link>

            <SearchBar />

            {userExists ? (
                <>
                    <div className={styles.main}>
                        <div>
                            <h1>{nickname}</h1>
                            <h3>
                                <span className={styles.red}>{game_count}</span>{" "}
                                games analyzed
                            </h3>
                        </div>
                        <div className={styles.update_container}>
                            <button className={styles.update_button}>
                                Update
                            </button>
                            <p className={styles.last_update}>
                                Last Updated: {update_date}
                            </p>
                        </div>
                    </div>

                    {rivals.length > 0 ? (
                        <>
                            <div className={styles.rivals_container}>
                                {rivals
                                    .slice(0, amountShown)
                                    .map((rival, index) => {
                                        return (
                                            <div
                                                key={rival.name}
                                                className={styles.rival_card}
                                                style={{
                                                    width: `${
                                                        minWidth +
                                                        10 -
                                                        index * 0.2
                                                    }rem`,
                                                }}
                                            >
                                                <h2>{rival.name}</h2>
                                                <h3>
                                                    <span
                                                        className={styles.red}
                                                    >
                                                        {rival.count}
                                                    </span>
                                                    {" deaths"}
                                                </h3>
                                            </div>
                                        );
                                    })}
                            </div>
                            {amountShown < rivals.length && (
                                <div className={styles.show_more_continer}>
                                    <button
                                        className={styles.show_more}
                                        onClick={increaseAmountShown}
                                    >
                                        Show More
                                    </button>
                                </div>
                            )}

                            <div className={styles.game_dates_container}>
                                <p className={styles.game_dates}>
                                    Analyzed Games from {start_date} to{" "}
                                    {end_date}
                                </p>
                            </div>
                        </>
                    ) : (
                        <p className={styles.no_games_found}>
                            No Games Found, Please Update
                        </p>
                    )}
                </>
            ) : (
                <h4>User Does not Exist</h4>
            )}
        </div>
    );
};

Profile.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ params, res }) => {
    const { nickname } = params;

    const result = await fetch(`http://localhost:8888/profile/${nickname}`);

    const data = await result.json();

    if (data.does_not_exist) {
        return {
            props: {
                userExists: false,
                rivals: [],
                game_count: 0,
                start_date: "",
                end_date: "",
                update_date: "",
            },
        };
    }

    return {
        props: {
            userExists: true,
            game_count: data.game_count,
            rivals: data.killers,
            start_date: data.start_date,
            end_date: data.end_date,
            update_date: data.update_date,
        },
    };
};

export default Profile;
