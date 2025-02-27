import styled from "styled-components";

const SteyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 5rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return <SteyledHeader>HEADER</SteyledHeader>;
}

export default Header;
