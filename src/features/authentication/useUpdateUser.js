import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success("User data successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: () => toast.error("User could not updated"),
  });

  return { isUpdating, updateUser };
}
