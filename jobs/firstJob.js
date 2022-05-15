import cron from 'node-cron'

cron.schedule('*/2 * * * * *', () => {
    console.log('running a task every 2 seconds')
})