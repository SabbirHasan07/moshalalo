import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  // Custom `find` method to fetch all events
  async find(ctx) {
    try {
      const events = await strapi.entityService.findMany('api::event.event', {
        populate: '*', // Populate all relationships as needed
      });

      return { data: events }; // Return all events
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching events');
    }
  },

  // Custom `findOne` method to fetch an event by slug
  async findOne(ctx) {
    const { slug } = ctx.params;

    if (!slug) {
      return ctx.badRequest('Slug is required');
    }

    try {
      // Query the database for the event with the specified slug
      const events = await strapi.entityService.findMany('api::event.event', {
        filters: { slug },
        populate: '*', // Populate all relationships as needed
      });

      if (events.length === 0) {
        return ctx.notFound('Event not found');
      }

      return { data: events[0] }; // Return the first event by slug
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching the event');
    }
  },
}));
