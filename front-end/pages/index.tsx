import Link from 'next/link';
import Head from 'next/head';
import { Header } from '../components/general/Header';
import { Hero } from '../components/landing/Hero';
import { FeatureCards } from '../components/landing/FeatureCards';
import { Footer } from '../components/general/Footer';
import styled from 'styled-components';

const StyledCallToAction = styled.a`
	display: block;
	background: var(--primary);
	text-decoration: none;
	color: #333;
	padding: 0.6em 1.2em;
	border-radius: 0.8rem;
	font-size: 2.4rem;
	margin: 0 auto;
	width: max-content;
	@media screen and (max-width: 25rem) {
		font-size: 1.8rem;
	}
`;

export default function Home(): JSX.Element {
	return (
		<>
			<Head>
				<title>umMeal - Meal planning made easy</title>
			</Head>
			<Header />
			<main>
				<Hero />
				<FeatureCards />
				<Link href="/" passHref>
					<StyledCallToAction>Create an Account Now</StyledCallToAction>
				</Link>
			</main>
			<Footer />
		</>
	);
}
