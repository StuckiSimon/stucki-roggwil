import { Hono } from 'hono';
import { env } from 'hono/adapter';
import { validator } from 'hono/validator';
import { userBookingSchema } from '../modules/booking/schemas';
import { AppContext } from '../types';
import { MailtrapClient } from 'mailtrap';

const schema = userBookingSchema;

export default (app: Hono<{ Bindings: Env }>) => {
  app.post(
    '/api/bookings',
    validator('json', (value, c: AppContext) => {
      const parsed = schema.safeParse(value);
      if (!parsed.success) {
        return c.json(parsed.error, 400);
      }
      return parsed.data;
    }),
    async (c) => {
      const booking = c.req.valid('json');

      const API_KEY = env(c).MAILTRAP_API_KEY;

      const client = new MailtrapClient({
        token: API_KEY,
      });

      const sender = {
        email: 'info@stucki-roggwil.ch',
        name: 'Buchungssystem',
      };
      const recipients = [
        {
          email: 'info@stuckiroggwil.ch',
        },
        {
          email: 'info@stucki-roggwil.ch',
        },
      ];

      await client.send({
        from: sender,
        to: recipients,
        template_uuid: '880d8e42-df72-40b5-92ca-d8317a73f5e5',
        template_variables: {
          subject: `Buchung von ${booking.firstName} ${booking.lastName}`,
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          phone: booking.phone,
          comment: booking.comment ?? 'Keine Angaben',
          brand: booking.brand ?? 'Keine Angaben',
          model: booking.model ?? 'Keine Angaben',
          licensePlate: booking.licensePlate ?? 'Keine Angaben',
          services: booking.services,
          slot: { date: booking.slot.date, startHour: booking.slot.startHour, endHour: booking.slot.endHour },
        },
      });

      return c.json(
        {
          message: 'Booking registered',
          date: new Date().toISOString(),
        },
        201,
      );
    },
  );
};
