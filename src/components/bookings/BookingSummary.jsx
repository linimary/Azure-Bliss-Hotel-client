import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import moment from "moment";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    // <div className="row"></div>
    // <div className="col-md-6"></div>
    <div className="card card-body mt-5">
      <h4 className="card-title hotel-color">Reservation Summary</h4>
      <p>
        Name : <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email : <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-In Date :{" "}
        <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Check-Out Date :{" "}
        <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Number of Days Booked : <strong>{numOfDays}</strong>
      </p>
      <div>
        <h5 className="hotel-color">Number of Guests</h5>
        <strong style={{ paddingRight: "10px" }}>
          Adult{booking.numOfAdults > 1 ? "s" : ""} : {booking.numOfAdults}
        </strong>
        <strong>Children : {booking.numOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total Payment : <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, redirecting to payment...
                </>
              ) : (
                "Confirm Booking & Proceed to Payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-tems-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">
          {" "}
          Check-out data must be after check-in date
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
