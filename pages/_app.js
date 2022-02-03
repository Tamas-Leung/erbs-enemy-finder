import "../styles/global/globals.scss";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <>
            <NextNProgress />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
