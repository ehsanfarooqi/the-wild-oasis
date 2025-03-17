import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const SteyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 2rem 5rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  return (
    <SteyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </SteyledHeader>
  );
}

export default Header;
