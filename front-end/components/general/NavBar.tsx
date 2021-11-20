import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../../public/logo.svg';

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 4.8rem 12.2rem;
`;

const Login = styled.a`
	text-decoration: none;
	color: white;
	display: block;
	background: var(--primary);
	border-radius: 0.8rem;
	padding: 0.6rem 1.2rem;
	font-size: 2.4rem;
	font-weight: medium;
`;

export function NavBar() {
	return (<Nav>
		<Image src={logo} alt="umMeal Logo"></Image>
		<Link href="/" passHref>
			<Login>Login/Signup</Login>
		</Link>
	</Nav>);
}