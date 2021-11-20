import Link from 'next/link';
import { NavBar } from '../components/general/NavBar';
import { Hero } from '../components/landing/Hero';
import { FeatureCards } from '../components/landing/FeatureCards';
import { Footer } from '../components/general/Footer';
import styled from 'styled-components';

const StyledCallToAction = styled.a`
	display: block;
	background: var(--primary);
	text-decoration: none;
	color: white;
	padding: 0.6em 1.2em;
	border-radius: 0.8rem;
	font-size: 2.4rem;
	margin: 0 auto;
	width: max-content;
`;

export default function Home(): JSX.Element {
	return (
		<>
			<NavBar />
			<Hero />
			<FeatureCards />
			<Link href="/" passHref>
				<StyledCallToAction>Create an Account Now</StyledCallToAction>
			</Link>
			<Footer />
		</>
	);
}
