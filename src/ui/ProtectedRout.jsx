import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRout({ children }) {
  const navigate = useNavigate();

  // 1. Load the user data authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is No authenticated use , redirect the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);
  //   if (!isAuthenticated) navigate("/login");

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user , render the app
  if (isAuthenticated) return children;
}

export default ProtectedRout;
