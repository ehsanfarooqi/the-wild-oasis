import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verufy the new account from the users email address"
      );
    },
    onError: () => toast.error("Could not successfully sign up"),
  });

  return { isLoading, signup };
}
