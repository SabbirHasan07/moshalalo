// src/api/article/controllers/article.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  // Custom `find` method to fetch all articles
  async find(ctx) {
    try {
      const articles = await strapi.entityService.findMany('api::article.article', {
        populate: '*', // Populate all relationships as needed
      });

      return { data: articles }; // Return all articles
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching articles');
    }
  },

  // Custom `findOne` method to fetch an article by slug
  async findOne(ctx) {
    const { slug } = ctx.params;

    if (!slug) {
      return ctx.badRequest('Slug is required');
    }

    try {
      // Query the database for the article with the specified slug
      const articles = await strapi.entityService.findMany('api::article.article', {
        filters: { slug }, // Filter articles by slug
        populate: '*', // Populate all relationships as needed
      });

      if (articles.length === 0) {
        return ctx.notFound('Article not found');
      }

      return { data: articles[0] }; // Return the first article by slug
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching the article');
    }
  },
}));
