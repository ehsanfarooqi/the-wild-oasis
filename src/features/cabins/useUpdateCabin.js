import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateMutate, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabin(newCabinData, id),

    onSuccess: () => {
      toast.success("Cabin succesfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateMutate, isUpdating };
}
