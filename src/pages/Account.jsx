import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import { useState } from "react";
import Button from "../ui/Button";
import { HiArrowCircleDown } from "react-icons/hi";

function Account() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>
      <div>
        <Button onClick={() => setShow((show) => !show)}>
          <span>Update your password</span> <HiArrowCircleDown />
        </Button>
      </div>

      {show && (
        <Row>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      )}
    </>
  );
}

export default Account;
