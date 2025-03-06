import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClirnt = useQueryClient();
  const { isLoading: isDeleted, mutate: deleteMutate } = useMutation({
    mutationFn: deleteCabin,

    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClirnt.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleted, deleteMutate };
}
