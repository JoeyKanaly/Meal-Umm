import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import logo from '../../public/logo-white.svg';

const StyledFooter = styled.footer`
	min-height: 30rem;
	padding: 0 var(--margin-left-right);
	display: flex;
	background: #222;
	margin-top: 7.2rem;
	overflow: scroll;
`;

const StyledFooterContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 56rem) {
		padding: var(--margin-top-bottom) 0;
		flex-direction: column;
	}
`;

const StyledFooterNav = styled.div`
	display: flex;
	nav {
		display: flex;
		flex-direction: column;
		width: max-content;
	}
	nav:first-child {
		margin-right: 1.2rem;
	}

	h2 {
		color: white;
		margin-bottom: 1.2rem;
	}
	a {
		text-decoration: none;
		color: white;
		margin: 0.3rem 0;
		font-size: 1.9rem;
	}
	a:first-child,
	a:last-child {
		margin-bottom: 0;
		margin-top: 0;
	}
`;

const StyledImageContainer = styled.div`
	@media screen and (max-width: 56rem) {
		margin-bottom: var(--margin-top-bottom);
	}
`;

export function Footer() {
	return (
		<StyledFooter>
			<StyledFooterContainer>
				<StyledImageContainer>
					<Link href="/">
						<a>
							<Image src={logo} alt="umMeal Logo"></Image>
						</a>
					</Link>
				</StyledImageContainer>
				<StyledFooterNav>
					<nav aria-label="Site">
						<h2>Site</h2>
						<Link href="/">
							<a>Home</a>
						</Link>
						<Link href="/">
							<a>Manage Account</a>
						</Link>
						<Link href="/">
							<a>Support</a>
						</Link>
					</nav>
					<nav aria-label="Legal">
						<h2>Legal</h2>
						<Link href="/">
							<a>Contact</a>
						</Link>
						<Link href="/">
							<a>About</a>
						</Link>
						<Link href="/">
							<a>Privacy Policy</a>
						</Link>
						<Link href="/">
							<a>Terms of Use</a>
						</Link>
					</nav>
				</StyledFooterNav>
			</StyledFooterContainer>
		</StyledFooter>
	);
}
