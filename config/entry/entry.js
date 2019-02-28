const site = require('../site.config.json');
module.exports = [
    {
        name: 'index',
        path: 'Index/Index.jsx',
        title: site.title,
        keywords: site.title,
        description: site.title
    },
    {
        name: 'demo',
        path: 'Demo/Index.jsx',
        title: 'demo',
        keywords: site.title,
        description: site.title
    }
];
