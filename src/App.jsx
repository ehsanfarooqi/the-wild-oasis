import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

const AppStyle = styled.div`
  background-color: var(--color-brand-500);
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppStyle>
        <H1>Thw Wild Oasis</H1>
        <Button onClick={() => alert("chick in")}>Chick in</Button>
        <Button onClick={() => alert("chick out")}>Chick out</Button>
        <Input type="number" placeholder="Number of Guest" />
      </AppStyle>
    </>
  );
}

export default App;
