import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
		--primary: #76D914;
	}
	* {
		margin: 0;
		padding: 0;
	}
	html {
		font-size: 10px;
	}
	body {
		font-size: 1.6rem;
		/* margin: 4.8rem 12.2rem; */
		padding: 0;
		font-family: 'Quicksand', Arial, Helvetica, sans-serif
	}
`;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<GlobalStyle />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
