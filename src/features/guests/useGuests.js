import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const { isLoading: isLoadingGuests, data: guests } = useQuery({
    queryFn: getGuests,
    queryKey: ["guests"],
  });

  return { isLoadingGuests, guests };
}
