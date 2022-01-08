import styled from 'styled-components';
import Image from 'next/image';
import heroImage from '../../public/mealPrep.svg';

const StyledHero = styled.div`
	margin-top: 7.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: var(--margin);
`;

const StyledDescription = styled.div`
	@media screen and (max-width: 56rem) {
		margin: 0 auto;
	}
	h1 {
		font-weight: bold;
		font-size: 3.6rem;
		margin-bottom: 1.6rem;
	}
	p {
		max-width: 45ch;
		line-height: 2.4rem;
	}
`;

const StyledImageContainer = styled.div`
	@media screen and (max-width: 56rem) {
		display: none;
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
			<StyledImageContainer>
				<Image src={heroImage} alt="Woman Cooking" width="467"></Image>
			</StyledImageContainer>
		</StyledHero>
	);
}
