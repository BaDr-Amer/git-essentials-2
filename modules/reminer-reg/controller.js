import User from '../../models/User.js'
import * as service from './service.js'
import mongoose from 'mongoose'
import Reminder from '../../models/Reminder.js'
import moment from 'moment';
import cron from 'node-cron';

export const createReminder = async (req, res) => {

  if (!User.completeReg) {
      const rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = [0, new schedule.Range(4, 6)];
      rule.hour = 17;
      rule.minute = 0;

      const job = schedule.scheduleJob(rule, function(){
        console.log('Today is recognized by Rebecca Black!');
});

  }
  var task = cron.schedule('* * * * *', () =>  {
    console.log('will not execute anymore, nor be able to restart');
  });

  task.destroy();
}
