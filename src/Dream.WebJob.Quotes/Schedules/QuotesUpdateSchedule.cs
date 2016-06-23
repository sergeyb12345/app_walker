using System;
using Microsoft.Azure.WebJobs.Extensions.Timers;

namespace Dream.WebJob.Quotes.Schedules
{
    public class QuotesUpdateSchedule : WeeklySchedule
    {
        public QuotesUpdateSchedule()
        {
            Add(DayOfWeek.Tuesday, new TimeSpan(9, 0, 0));
            Add(DayOfWeek.Wednesday, new TimeSpan(9, 0, 0));
            Add(DayOfWeek.Thursday, new TimeSpan(9, 0, 0));
            Add(DayOfWeek.Friday, new TimeSpan(9, 0, 0));
            Add(DayOfWeek.Saturday, new TimeSpan(9, 0, 0));
        }
    }
}