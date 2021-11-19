module.exports = {
    apps: [{
        name: 'movies_api',
        script: 'app.js',
        // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
        instances: 1,
        autorestart: true,
        watch: false,
        log_date_format: 'YYYY-MM-DD HH:mm Z',
        max_memory_restart: '1G',
        env_staging: {
            name: 'movies_api',
            PORT: 3007,
            NODE_ENV: 'staging',
        },
        env_production: {
            name: 'movies_api-production',
            PORT: 3007,
            NODE_ENV: 'production',
        },
        node_args: "--max_old_space_size=4096",
    }],
    deploy: {
        staging: {
            user: 'ubuntu',
            host: '52.72.95.145',
            ref: 'origin/staging',
            repo: 'git@github.com:InfusemediaTeam/email-automation-front.git',
            path: '/home/ubuntu/apps/email-automation-front',
            ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            env: {
                NODE_ENV: 'staging',
            },
            'pre-setup': 'rm -rf /home/ubuntu/apps/email-automation-front',
            'post-deploy': 'npm install && env NODE_OPTIONS=--max_old_space_size=4096 npm run build && pm2 startOrRestart ecosystem.config.js --env staging --update-env',
        },
        production: {
            user: 'ubuntu',
            host: '52.72.95.145',
            ref: 'origin/master',
            repo: 'git@github.com:InfusemediaTeam/email-automation-front.git',
            path: '/home/ubuntu/apps/email-automation-front-production',
            ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
            env: {
                NODE_ENV: 'production',
            },
            'pre-setup': 'rm -rf /home/ubuntu/apps/email-automation-front-production',
            'post-deploy': 'yarn install && env NODE_ENV=production NODE_OPTIONS=--max_old_space_size=4096 yarn run build && pm2 delete email-automation-front && pm2 reload ecosystem.config.js --env production --update-env',
        },
    },
};
