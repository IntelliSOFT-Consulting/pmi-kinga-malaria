import Schedule from '../models/schedules';

export const importSchedules = async () => {
  try {
    const schedules = await Schedule.find();

    if (schedules.length === 0) {
      const schedules = [
        {
          report: 'Supervisory Report',
          frequency: 'daily',
          day: '',
          recurring: true,
          time: '20:00',
        },
        {
          report: 'SMS Reports',
          frequency: 'daily',
          day: '',
          recurring: true,
          time: '20:00',
        },
        {
          report: 'Submissions By Form',
          frequency: 'weekly',
          day: 'Friday',
          recurring: true,
          time: '20:00',
        },
        {
          report: 'Late PMT',
          frequency: 'daily',
          day: '',
          recurring: true,
          time: '18:00',
        },
      ];

      await Schedule.insertMany(schedules);
    }
  } catch (error) {
    console.log(error);
  }
};
