// module.exports = {
//   apps: [
//     {
//       name: "Our-Shelves-Backend",
//       cwd: "./server",
//       script: "npm",
//       args: "run dev",
//       env: {
//         NODE_ENV: "development",
//         PORT: 3001
//       }
//     },
//     {
//       name: "Our-Shelves-Frontend",
//       cwd: "./client",
//       script: "npm",
//       args: "run dev",
//       env: {
//         NODE_ENV: "development",
//         PORT: 3000
//       }
//     }
//   ]
// };

module.exports = {
  apps: [
    {
      name: "Our-Shelves-Backend",
      cwd: "./Our-Shelves/server",
      script: "node",
      args: "index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0"
      },
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
      out_file: "/var/log/ourshelves/out.log",
      error_file: "/var/log/ourshelves/err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    },
    {
      name: "Our-Shelves-Frontend",
      cwd: "./Our-Shelves/client",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOST: "0.0.0.0"
      }
    }
  ]
};

