export default {
  routes: [
    {
      // Route for fetching all articles
      method: 'GET',
      path: '/events',
      handler: 'event.find',
      config: {
        auth: false, // Disable authentication
      },
    },
    {
      // Route for fetching a single article by slug
      method: 'GET',
      path: '/events/:slug',
      handler: 'event.findOne',
      config: {
        auth: false, // Disable authentication
      },
    },
  ],
};
