import styled from 'styled-components';

const Container = styled.div`
	padding-top: 34px;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 5;
	opacity: 0;
	visibility: hidden;
`;

const Canvas = styled.canvas`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const TextInView = styled.div`
	clip-path: inset(0 0 100% 0);
`;

const Ul = styled.ul`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	list-style-type: none;
`;

export { Container, Canvas, TextInView, Ul };
