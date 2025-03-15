import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    isLoading: isDeleting,
    isError,
    mutate: mutateDelete,
  } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(`The booking successfully deleted`),
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
    },
    onError: () => toast.error("The booking could non deleted"),
  });

  return { isDeleting, isError, mutateDelete };
}
