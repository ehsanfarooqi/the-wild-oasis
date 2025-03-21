import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    isLoading: isCheckout,
    isError,
    mutate: checkout,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: () => {
      toast.success(`The booking successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("The booking could not checked out"),
  });

  return { isCheckout, isError, checkout };
}
