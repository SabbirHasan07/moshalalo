import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({

  // Custom `find` method to fetch all articles
  async find(ctx) {
    try {
      const articles: any = await strapi.entityService.findMany('api::article.article', {
        populate: '*',
      });

      // Remove sensitive fields from createdBy and updatedBy
      articles.forEach((article) => {
        if (article.createdBy) {
          const { password, resetPasswordToken, ...createdByRest } = article.createdBy;
          article.createdBy = createdByRest;
        }

        if (article.updatedBy) {
          const { password, resetPasswordToken, ...updatedByRest } = article.updatedBy;
          article.updatedBy = updatedByRest;
        }
      });

      return { data: articles };
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching articles');
    }
  },

  // Custom `findOne` method using slug
  async findOne(ctx) {
    const { slug } = ctx.params;

    if (!slug) {
      return ctx.badRequest('Slug is required');
    }

    try {
      const articles: any = await strapi.entityService.findMany('api::article.article', {
        filters: { slug },
        populate: '*',
      });

      if (articles.length === 0) {
        return ctx.notFound('Article not found');
      }

      const article = articles[0];

      if (article.createdBy) {
        const { password, resetPasswordToken, ...createdByRest } = article.createdBy;
        article.createdBy = createdByRest;
      }

      if (article.updatedBy) {
        const { password, resetPasswordToken, ...updatedByRest } = article.updatedBy;
        article.updatedBy = updatedByRest;
      }

      const { password, resetPasswordToken, ...rest } = article;
      return { data: rest };
    } catch (error) {
      return ctx.internalServerError('An error occurred while fetching the article');
    }
  },
}));
