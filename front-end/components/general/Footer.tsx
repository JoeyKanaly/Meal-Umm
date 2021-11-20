import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import logo from '../../public/logo-white.svg';

const StyledFooter = styled.footer`
	height: 30rem;
	padding: 0 12.2rem;
	display: flex;
	background: #222;
	margin-top: 7.2rem;
`;

const StyledFooterContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;

const StyledFooterNav = styled.nav`
	display: flex;
	div {
		display: flex;
		flex-direction: column;
	}
	div:first-child {
		margin-right: 1.2rem;
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

export function Footer() {
	return (
		<StyledFooter>
			<StyledFooterContainer>
				<Image src={logo} alt="umMeal Logo"></Image>
				{/*
			links
				Site Nav
				Legal Nav
		*/}
				<StyledFooterNav>
					<div>
						<Link href="/">
							<a>Home</a>
						</Link>
						<Link href="/">
							<a>Manage Account</a>
						</Link>
						<Link href="/">
							<a>Support</a>
						</Link>
					</div>
					<div>
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
					</div>
				</StyledFooterNav>
			</StyledFooterContainer>
		</StyledFooter>
	);
}
