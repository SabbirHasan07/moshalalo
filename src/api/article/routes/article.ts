/**
 * article router
 */

import { factories } from '@strapi/strapi';

export default {
  routes: [
    {
      // Route for fetching all articles
      method: 'GET',
      path: '/articles',
      handler: 'article.find',
      config: {
        auth: false, // Disable authentication
      },
    },
    {
      // Route for fetching a single article by slug
      method: 'GET',
      path: '/articles/:slug',
      handler: 'article.findOne',
      config: {
        auth: false, // Disable authentication
      },
    },
  ],
};