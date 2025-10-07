module.exports = {
    apps: [
      {
        name: "Our-Shelves-Backend",
        cwd: "./server",
        script: "npm",
        args: "run dev",
        env: {
          NODE_ENV: "development",
          PORT: 3001
        }
      },
      {
        name: "Our-Shelves-Frontend",
        cwd: "./client",
        script: "npm",
        args: "run dev",
        env: {
          NODE_ENV: "development",
          PORT: 3000
        }
      }
    ]
  };
  