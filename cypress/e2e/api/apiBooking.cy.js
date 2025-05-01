import { bookingAPI } from "../../pageObjects/bookingAPI";

describe('Test Booking API Flow', () => {
    it('Test create token, create booking, and get booking', () => {
        bookingAPI.createToken()
            .then(() => bookingAPI.createBooking())
            .then(() => bookingAPI.getBooking());
    });
});
