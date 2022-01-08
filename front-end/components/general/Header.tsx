import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: var(--margin);
`;

const Login = styled.a`
	text-decoration: none;
	color: #333;
	display: block;
	background: var(--primary);
	border-radius: 0.8rem;
	padding: 0.6rem 1.2rem;
	font-size: 2.4rem;
	font-weight: medium;
	@media screen and (max-width: 56rem) {
		font-size: 1.8rem;
	}
`;

export function Header() {
	return (
		<StyledHeader>
			<Link href="/">
				<a><Image src={logo} alt="umMeal Logo"></Image></a>
			</Link>
			<Link href="/" passHref>
				<Login>Login</Login>
			</Link>
		</StyledHeader>
	);
}
