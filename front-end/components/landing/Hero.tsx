import styled from 'styled-components';
import Image from 'next/image';
import heroImage from '../../public/mealPrep.svg';

const StyledHero = styled.div`
	margin-top: 7.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 4.8rem 12.2rem;
`;

const StyledDescription = styled.div`
	h1 {
		font-weight: bold;
		font-size: 3.6rem;
		margin-bottom: 1.6rem;
	}
	p {
		width: 45ch;
		line-height: 2.4rem;
	}
`;

export function Hero() {
	return (
		<StyledHero>
			<StyledDescription>
				<h1>Meal Planning Made Easy</h1>
				<p>
					Take the umm out of meal planning. Using umMeal, meal planning becomes
					as easy as ordering takeout. Choose from over 100 different meals,
					tailored to your food preferences, and plan out your weeks worth of
					meals. You’ll get an easy shopping list that makes sure you only buy
					what you need, and nothing more.
				</p>
			</StyledDescription>
			<Image src={heroImage} alt="" width="467"></Image>
		</StyledHero>
	);
}
