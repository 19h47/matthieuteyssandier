import styled from 'styled-components';

const Container = styled.div`
	position: relative;
	height: 20px;
	overflow: hidden;
`;

const Ul = styled.ul`
	list-style-type: none;
	display: flex;
`;

const Li = styled.li`
	margin-right: 2px;
	z-index: ${props => (props.$length - props.$index).toString()};

	&:last-child {
		margin-right: 0;
	}
`;

const Button = styled.button`
	display:block;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background-color: ${props => props.$backgroundColor};
`;

export { Container, Ul, Li, Button };