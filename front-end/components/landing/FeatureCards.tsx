import Image from 'next/image';
import styled from 'styled-components';
import FirstStepGraphic from '../../public/meals.svg';

const StyledFeatureSection = styled.div`
	margin: 4.8rem 12.2rem;
	margin-top: 7.2rem;
	h1 {
		text-align: center;
		margin-bottom: 4.8rem;
	}
`;

const StyledFeatureCards = styled.div`
	display: flex;
	justify-content: space-between;
	height: 47.2rem;
`;

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 0.8rem;
	box-shadow: 0 0 8px rgba(0,0,0,0.25);
	text-align: center;
	p {
		max-width: 25ch;
		line-height: 2.4rem;
	}
	h2 {
		max-width: 10ch;
		margin-bottom: 1.6rem;
	}
`;

const StyledCircle = styled.div`
	border-radius: 50%;
	background: var(--primary); 
	color: white;
	font-size: 2.4rem;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 4.8rem;
	width: 4.8rem;
	margin: 1.6rem 0;
`;

const StyledImage = styled.img`
	width: 316px;
	margin: 0.6rem;
	margin-bottom: 0;
`;

export function FeatureCards() {
	return (
		<StyledFeatureSection>
			<h1>It’s as easy as:</h1>
			<StyledFeatureCards>
				<StyledCard>
					<StyledImage src={FirstStepGraphic.src} alt="" />
					<StyledCircle>1</StyledCircle>
					<h2>Choose your meals</h2>
					<p>Choosing from our over 100 different meals is as simple as dragging and dropping onto a calendar.</p>
				</StyledCard>
				<StyledCard>
					<StyledImage src={FirstStepGraphic.src} alt="" />
					<StyledCircle>2</StyledCircle>
					<h2>Go shopping</h2>
					<p>Using the generated shopping list, shopping becomes a whole lot easier and who a whole lot cheaper. Get only the things you need and reduce the amount of excess waste.</p>
				</StyledCard>
				<StyledCard>
					<StyledImage src={FirstStepGraphic.src} alt="" />
					<StyledCircle>3</StyledCircle>
					<h2>Cook and enjoy</h2>
					<p>Using the step-by-step instructions, you can gurantee you’ll cook the perfect meal every night.</p>
				</StyledCard>
			</StyledFeatureCards>
		</StyledFeatureSection>
	);
}