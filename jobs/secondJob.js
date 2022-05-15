import cron from 'node-cron'

cron.schedule('*/4 * * * * *', () => {
    console.log('running a task every 4 seconds')
})