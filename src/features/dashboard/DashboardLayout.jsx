import styled from "styled-components";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "../dashboard/useRecentBookings";
import { useRecentStays } from "../dashboard/useRecentStays";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoadin1, bookings } = useRecentBookings();
  const { isLoading2, stays, confirmStays, numDays } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useCabins();

  if (isLoadin1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStays={confirmStays}
        numDays={numDays}
        cabinsCount={cabins.length}
      />

      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
