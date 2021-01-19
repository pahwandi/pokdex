import styled from '@emotion/styled';

const getWidthString = (span) => {
  if (!span) return;

  let width = span / 12 * 100;
  return `width: ${width}%;`;
}

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
`;

export const Row = styled.div`
  &::after {
    content: "";
    clear: both;
    display: table;
  }
`;

export const Column = styled.div`
  float: left;
  ${({ xs }) => (xs ? getWidthString(xs) : "width: 100%")};

  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && getWidthString(sm)};
  }
  @media only screen and (min-width: 980px) {
    ${({ md }) => md && getWidthString(md)};
  }
  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && getWidthString(lg)};
  }
`;

export const Card = styled.div`
  text-align: center;
  background-image: linear-gradient(to bottom right, #ddfde6, #a7ffc0);
  box-shadow: 3px 3px 16px 0px #eaeaea;
  border-radius: 16px;
  margin: 8px;
  ${({onClick}) => onClick
  ? `&:hover {
      background-image: linear-gradient(to bottom right, #ceffdc, #86ffa8);
      box-shadow: 3px 3px 18px 0px #ddd;
      cursor: pointer;
      transition: .5s;
    }`
  : ''}
`;


export const CardFooter = styled.div`
  padding: 16px;
  background: rgba(255,255,255,.7);
  margin-top: 2.5rem;
  border-radius: 16px;
`

export const H3 = styled.h3`
  text-transform: uppercase;
  margin-block-end: 0.5em;
`;

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  ${({center}) => center ? 'justify-content: center;' : null}
`;

export const Tag = styled.div`
  padding: 1px 10px;
  margin: 2px;
  color: #01aefe;
  border: 1px solid #01aefe;
  border-radius: 18px;
  font-weight: 700;
`;

export const Button = styled.button`
  border: 0;
  border-radius: 20px;
  background-color: #e57373;
  color: #fff;
  padding: 8px 18px;
  text-transform: uppercase;
  outline: unset;
  &:hover {
    background-color: #af4448;
  }
`;


