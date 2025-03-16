import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const SteyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 5rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

function Header() {
  return (
    <SteyledHeader>
      <Logout />
    </SteyledHeader>
  );
}

export default Header;
