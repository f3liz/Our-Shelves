module.exports = {
  apps: [
    {
      name: "Our-Shelves-Backend",
      cwd: "./server",
      script: "node",
      args: "index.js",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
      out_file: "/var/log/ourshelves/backend-out.log",
      error_file: "/var/log/ourshelves/backend-err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    },
    {
      name: "Our-Shelves-Frontend",
      cwd: "./client",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
      out_file: "/var/log/ourshelves/frontend-out.log",
      error_file: "/var/log/ourshelves/frontend-err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};


