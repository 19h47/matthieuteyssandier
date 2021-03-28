import styled from 'styled-components';

const Container = styled.li`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
`;

const Images = styled.div`
	mix-blend-mode: multiply;
	filter: grayscale(100%);
`;

const Column = styled.div`
	font-size: 35px;
	line-height: 100%;

	p {
		margin: 0;
	}
`;

const Footer = styled.footer`
	margin-top: 50px;
`;

export { Container, Images, Column, Footer };
