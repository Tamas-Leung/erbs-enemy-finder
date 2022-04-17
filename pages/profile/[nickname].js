import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/components/Profile.module.scss";
import Link from "next/link";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { RivalsList } from "./RivalsList";
import Image from "next/image";

const Profile = ({
    userExists,
    rivals_data,
    start_date,
    end_date,
    update_date,
    game_count,
    nickname,
    character,
    error,
}) => {
    const router = useRouter();
    const [rivals, setRivals] = useState(rivals_data);
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);
    const [updateDate, setUpdateDate] = useState(update_date);
    const [gameCount, setGameCount] = useState(game_count);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState(null);

    useEffect(() => {
        if (start_date) {
            let startDate = new Date(start_date);
            setStartDate(startDate.toLocaleDateString());
        } else {
            setStartDate(null);
        }
        if (end_date) {
            let endDate = new Date(end_date);
            setEndDate(endDate.toLocaleDateString());
        } else {
            setEndDate(null);
        }
        if (update_date) {
            let updateDate = new Date(update_date);
            setUpdateDate(updateDate.toLocaleDateString());
        } else {
            setUpdateDate(null);
        }

        setIsUpdating(false);
        setRivals(rivals_data);
        setGameCount(game_count);
        setCurrentCharacter(character);
    }, [
        rivals_data,
        start_date,
        end_date,
        update_date,
        game_count,
        error,
        character,
    ]);

    const updateData = async () => {
        setIsUpdating(true);

        const result = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/api/profile/${nickname}/update`
        );

        if (result.status == 404) {
            alert("ERROR: Backend Missing, Try Again Later");
            setIsUpdating(false);
        }

        const data = await result.json();

        if (!result.ok) {
            alert(data.error);
            setIsUpdating(false);
            return;
        }

        router.reload();
        setIsUpdating(false);
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
                <div className={styles.main}>
                    <div className={styles.profile_box}>
                        <div>
                            <div className={styles.profile_character_bg}>
                                {currentCharacter && (
                                    <Image
                                        // src={`/characters/${character}_Mini.png`}
                                        src={`/characters/${currentCharacter}_Half.png`}
                                        // src={`/characters/${character}_Full.png`}
                                        alt={`${currentCharacter}`}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                    />
                                )}
                            </div>
                            <h1>{nickname}</h1>
                            {(gameCount > 0) && (
                                <h3>
                                    <span className={styles.red}>
                                        {gameCount}
                                    </span>{" "}
                                    games analyzed
                                </h3>
                            )}
                        </div>
                        <div className={styles.update_container}>
                            <button
                                className={styles.update_button}
                                onClick={updateData}
                            >
                                {isUpdating ? <Loader /> : "Update"}
                            </button>
                            {updateDate && (
                                <p className={styles.last_update}>
                                    Last Updated: {updateDate}
                                </p>
                            )}
                        </div>
                        <div className={styles.game_dates_container}>
                            {startDate && endDate && (
                                <p className={styles.game_dates}>
                                    Analyzed Games from <b>{startDate}</b> to{" "}
                                    <b>{endDate}</b>
                                </p>
                            )}
                        </div>
                    </div>

                    {rivals?.length > 0 ? (
                        <RivalsList rivalsList={rivals} />
                    ) : (
                        <p className={styles.no_games_found}>
                            No Games Found, Please Update
                        </p>
                    )}
                </div>
            ) : !error ? (
                <h4>User Does not Exist</h4>
            ) : (
                <h4>{error}</h4>
            )}
        </div>
    );
};

Profile.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({ params, res }) => {
    const { nickname } = params;

    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/api/profile/${nickname}`);

    const data = await result.json();

    if (!result.ok) {
        return {
            props: {
                error: data.error,
            },
        };
    }

    if (data.does_not_exist) {
        return {
            props: {
                userExists: false,
                rivals_data: [],
                game_count: 0,
                start_date: "",
                end_date: "",
                update_date: "",
                character: 0,
                nickname: nickname,
            },
        };
    }

    return {
        props: {
            userExists: true,
            game_count: data.game_count,
            rivals_data: data.killers,
            start_date: data.start_date,
            end_date: data.end_date,
            update_date: data.update_date,
            character: data.character || 0,
            nickname: data.nickname || "",
        },
    };
};

export default Profile;
