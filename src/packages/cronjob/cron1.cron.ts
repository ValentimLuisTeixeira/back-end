import { CronJob } from 'cron';


new CronJob('*/1 * * * *', () => {
    console.log('[CRONJOB]','Dummy cronjob');
}, null, false, 'Europe/Lisbon').start();

