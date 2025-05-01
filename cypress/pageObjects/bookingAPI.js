import { faker } from '@faker-js/faker';

export class BookingAPI {
  constructor() {
    this.token = null;
    this.bookingId = null;
    this.firstname = faker.name.firstName();
    this.lastname = faker.name.lastName();
  }

  createToken() {
    return cy.fixture('user').then((userData) => {
      return cy.request({
        method: 'POST',
        url: '/auth',
        body: {
          username: userData.username,
          password: userData.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.exist;
        this.token = response.body.token;
      });
    });
  }

  createBooking() {
    return cy.request({
      method: 'POST',
      url: '/booking',
      body: {
        firstname: this.firstname,
        lastname: this.lastname,
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2025-02-03',
          checkout: '2025-02-07'
        },
        additionalneeds: 'Breakfast'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.booking.firstname).to.not.be.empty;
      expect(response.body.booking.lastname).to.not.be.empty;
      expect(response.body.booking.firstname).to.eq(this.firstname);
      expect(response.body.booking.lastname).to.eq(this.lastname);
      this.bookingId = response.body.bookingid;
    });
  }

  getBooking() {
    return cy.request({
      method: 'GET',
      url: `/booking/${this.bookingId}`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.firstname).to.not.be.empty;
      expect(response.body.lastname).to.not.be.empty;
      expect(response.body.firstname).to.eq(this.firstname);
      expect(response.body.lastname).to.eq(this.lastname);
      expect(response.body.additionalneeds).to.eq('Breakfast');
    });
  }
}

export const bookingAPI = new BookingAPI();
