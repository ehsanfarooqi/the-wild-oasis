import styled from "styled-components";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { differenceInDays, isBefore, isDate, startOfToday } from "date-fns";

import { useSettings } from "../settings/useSettings";
import { useGuests } from "../guests/useGuests";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";

import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Checkbox from "../../ui/Checkbox";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function CreateBookingForm({ onCloseModal }) {
  const [hasBreakfast, setHasbreakfats] = useState(false);
  const [isPaid, seIsPaid] = useState(false);

  const { isLoading: isLoadingSetting, settings } = useSettings();
  const { isLoadingGuests, guests } = useGuests();
  const { isLoading: isLoadingCabins, cabins } = useCabins();
  const { isCreating, createBooking } = useCreateBooking();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  if (isLoadingSetting || isLoadingGuests || isLoadingCabins || isCreating)
    return <Spinner />;

  function onSubmit(data) {
    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );

    const today = startOfToday();

    if (numNights < 1) {
      toast.error("Start date must be before end date");
      return;
    }
    if (numNights < settings.minBookingLength) {
      toast.error(
        `Minimum nights per booking are ${settings.minBookingLength}`
      );
      return;
    }
    if (numNights > settings.maxBookingLength) {
      toast.error(
        `Maximum nights per booking are ${settings.maxBookingLength}`
      );
      return;
    }

    if (isBefore(new Date(data.startDate), today)) {
      toast.error("you can't start a booking before today");
      return;
    }

    // Get Cabin Prices
    const resevedCabin = cabins
      .filter((cabin) => cabin.id === Number(data.cabinId))
      .at(0);

    const cabinPrice =
      (resevedCabin.regularPrice - resevedCabin.discount) * numNights;

    const extrasPrice = hasBreakfast
      ? settings.breakfastPrice * numNights * data.numGuests
      : 0;

    const totalPrice = cabinPrice + extrasPrice;

    const finalData = {
      ...data,
      extrasPrice,
      totalPrice,
      cabinPrice,
      isPaid,
      numNights,
      cabinId: Number(data.cabinId),
      numGuests: Number(data.numGuests),
      guestId: Number(data.guestId),
      hasBreakfast,
      status: "unconfirmed",
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    };

    createBooking(finalData, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            validate:
              isDate(getValues().startDate) || "You must chose valid date",
          })}
        />
      </FormRow>

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate:
              isDate(getValues().endDate) || "You must chose valid date",
          })}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum number id guests must be 1",
            },
            max: {
              value: settings.maxBookingLength,
              message: `Max number of guest must be ${settings.maxBookingLength}`,
            },
          })}
        />
      </FormRow>

      <FormRow label="Select cabins">
        <StyledSelect
          disabled={isCreating}
          id="cabinId"
          {...register("cabinId")}
        >
          {cabins.map((cabin) => (
            <option key={cabin.id} value={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Select guest">
        <StyledSelect
          disabled={isCreating}
          id="guestId"
          {...register("guestId")}
        >
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Further observations">
        <Input
          type="text"
          id="observations"
          disabled={isCreating}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        <Checkbox
          id="breakfast"
          onChange={() => setHasbreakfats((breakfast) => !breakfast)}
          disabled={isCreating}
        >
          I want breakfast with my booking
        </Checkbox>
      </FormRow>

      <FormRow>
        <Checkbox
          id="breakfast"
          onChange={() => seIsPaid((paid) => !paid)}
          disabled={isCreating}
        >
          This booking is paid
        </Checkbox>
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          cancel
        </Button>
        <Button disabled={isCreating}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
