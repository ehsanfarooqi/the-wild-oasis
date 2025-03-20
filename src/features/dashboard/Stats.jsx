import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmStays, numDays, cabinsCount }) {
  // 1. Num of Bookings
  const numBookings = bookings.length;

  // 2. Sub of Total Price
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. Checkin ins
  const checkins = confirmStays.length;

  // 4. Num check in nights all available night / (num days * num cabins)
  const accupation =
    confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(accupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
