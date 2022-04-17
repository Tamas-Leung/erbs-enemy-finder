import styles from "../../styles/components/RivalsList.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";

export const RivalsList = ({ rivalsList }) => {
    const [amountShown, setAmountShown] = useState(5);

    const increaseAmountShown = async () => {
        const newAmountShown = Math.min(amountShown + 5, rivalsList.length);
        setAmountShown(newAmountShown);
    };

    return (
        <div>
            <div className={styles.rivals_container}>
                {rivalsList.slice(0, amountShown).map((rival, index) => {
                    return <RivalsBox key={rival.userNum} rival={rival} />;
                })}
            </div>
            {amountShown < rivalsList.length && (
                <div className={styles.show_more_continer}>
                    <button
                        className={styles.show_more}
                        onClick={increaseAmountShown}
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

const RivalsBox = ({ rival }) => {
    const [nickname, setNickname] = useState("");
    const [characterCode, setCharacterCode] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_ROUTE}/api/profile/short/${rival.userNum}`
            );

            const data = await result.json();

            if (!result.ok) {
                setError(data.error);
                return;
            }

            setNickname(data.nickname);
            setCharacterCode(data.character);
        };

        fetchData();
    }, [rival]);

    return (
        <div className={styles.rival_card}>
            <div className={styles.rival_img_container}>
                {characterCode ? (
                    <Image
                        src={`/characters/${characterCode}_Mini.png`}
                        alt={`${characterCode}`}
                        layout="fill"
                        objectFit="cover"
                    />
                ) : (
                    <div className={styles.character_skeleton} />
                )}
            </div>
            <div className={styles.content}>
                <h2>
                    {error ? (
                        <div className={styles.rival_error_message}>
                            {error}
                        </div>
                    ) : nickname ? (
                        nickname
                    ) : (
                        <div className={styles.nickname_skeleton} />
                    )}
                </h2>
                <h3>
                    <span className={styles.red}>{rival.count}</span>
                    {" deaths"}
                </h3>
            </div>
        </div>
    );
};
