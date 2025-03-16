import styled from "styled-components";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { isLoading, signup } = useSignup();
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm();

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label>Full Name</Label>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.fullName?.message && <Error>{errors.fullName.message}</Error>}
      </FormRow>
      <FormRow>
        <Label>Email address</Label>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
        {errors?.email?.message && <Error>{errors.email.message}</Error>}
      </FormRow>
      <FormRow>
        <Label>Password (min 8 characters)</Label>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 charachters",
            },
          })}
        />
        {errors?.password?.message && <Error>{errors.password.message}</Error>}
      </FormRow>
      <FormRow>
        <Label>Repeat password</Label>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password need to mutch",
          })}
        />
        {errors?.passwordConfirm?.message && (
          <Error>{errors.passwordConfirm.message}</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
