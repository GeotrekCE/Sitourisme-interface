module.exports = {
  apps: [
    // Preprod
    {
      name: 'PACA-GUI-DEV',
      script: 'server.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'preproduction'
      },
      exec_mode: 'cluster',
      instances: 1
    },
    {
      name: 'PACA-GUI',
      script: 'server.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production'
      },
      exec_mode: 'cluster',
      instances: 1
    }
  ]
};
