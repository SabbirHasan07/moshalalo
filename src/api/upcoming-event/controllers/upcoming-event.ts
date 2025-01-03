/**
 * upcoming-event controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::upcoming-event.upcoming-event', ({ strapi }) => ({
  async find(ctx) {
    // Adding populate=* to populate all relations
    ctx.query = {
      ...ctx.query,
      populate: '*',
    };

    // Call the default core controller's find method
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
}));
