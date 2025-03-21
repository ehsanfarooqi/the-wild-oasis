import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";
function CheckoutButton({ bookingId }) {
  const { isCheckout, checkout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckout}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
