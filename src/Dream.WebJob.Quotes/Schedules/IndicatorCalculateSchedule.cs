using System;
using Microsoft.Azure.WebJobs.Extensions.Timers;

namespace Dream.WebJob.Quotes.Schedules
{
    public class IndicatorCalculateSchedule : WeeklySchedule
    {
        public IndicatorCalculateSchedule()
        {
            Add(DayOfWeek.Monday, new TimeSpan(12, 0, 0));
            Add(DayOfWeek.Tuesday, new TimeSpan(12, 0, 0));
            Add(DayOfWeek.Wednesday, new TimeSpan(12, 0, 0));
            Add(DayOfWeek.Thursday, new TimeSpan(12, 0, 0));
            Add(DayOfWeek.Friday, new TimeSpan(12, 0, 0));
            Add(DayOfWeek.Saturday, new TimeSpan(12, 0, 0));
        }
    }
}