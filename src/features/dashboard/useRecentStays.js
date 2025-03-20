import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searParams] = useSearchParams();

  const numDays = !searParams.get("last") ? 7 : Number(searParams.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading: isLoading2, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isLoading2, stays, confirmStays, numDays };
}
