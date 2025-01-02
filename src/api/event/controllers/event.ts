import { factories } from '@strapi/strapi';



export default factories.createCoreController('api::event.event', ({ strapi }) => ({
  // Custom `find` method to fetch all events
  async find(ctx) {
    try {
      const events: any = await strapi.entityService.findMany('api::event.event', {
        populate: '*', // Populate all relationships as needed
      });

      // Remove sensitive fields from createdBy and updatedBy for each event
      events.forEach((event) => {
        if (event.createdBy) {
          const { password, resetPasswordToken, ...createdByRest } = event.createdBy;
          event.createdBy = createdByRest;
        }

        if (event.updatedBy) {
          const { password, resetPasswordToken, ...updatedByRest } = event.updatedBy;
          event.updatedBy = updatedByRest;
        }
      });

      return { data: events }; 
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching events');
    }
  },

  
  async findOne(ctx) {
    const { slug } = ctx.params;

    if (!slug) {
      return ctx.badRequest('Slug is required');
    }

    try {
      const events: any = await strapi.entityService.findMany('api::event.event', {
        filters: { slug },
        populate: '*',
      });

      if (events.length === 0) {
        return ctx.notFound('Event not found');
      }

      const event = events[0];

    
      if (event.createdBy) {
        const { password, resetPasswordToken, ...createdByRest } = event.createdBy;
        event.createdBy = createdByRest;
      }

      if (event.updatedBy) {
        const { password, resetPasswordToken, ...updatedByRest } = event.updatedBy;
        event.updatedBy = updatedByRest;
      }

     
      const { password, resetPasswordToken, ...rest } = event;
      return { data: rest }; 
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching the event');
    }
  },
}));
