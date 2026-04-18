// Pm2 ecosystem — один файл, две службы.
// Запуск: pm2 start deploy/ecosystem.config.js && pm2 save

module.exports = {
  apps: [
    {
      name: "aksystems-web",
      cwd: "/var/www/aksystems/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1, // можно "max" для кластера
      exec_mode: "fork", // "cluster" если instances > 1
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      max_memory_restart: "600M",
      out_file: "/var/log/pm2/aksystems-web.out.log",
      error_file: "/var/log/pm2/aksystems-web.err.log",
      merge_logs: true,
      time: true,
    },
    {
      name: "aksystems-bot",
      cwd: "/var/www/aksystems/bot",
      // Поменяйте script под ваш стек:
      // Node.js:  script: "dist/index.js" или "src/index.js"
      // Python:   interpreter: "python3", script: "main.py"
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "400M",
      out_file: "/var/log/pm2/aksystems-bot.out.log",
      error_file: "/var/log/pm2/aksystems-bot.err.log",
      merge_logs: true,
      time: true,
      // Если бот на long-poll — не запускайте вторую копию.
      instances: 1,
      exec_mode: "fork",
    },
  ],
};
