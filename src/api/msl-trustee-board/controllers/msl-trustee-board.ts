import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::msl-trustee-board.msl-trustee-board', ({ strapi }) => ({
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
