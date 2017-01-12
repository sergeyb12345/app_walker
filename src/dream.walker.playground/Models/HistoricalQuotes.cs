using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class HistoricalQuotes : List<QuotesModel>
    {
        public bool Replace { get; private set; }


        public HistoricalQuotes()
        {
            
        }

        public HistoricalQuotes(List<QuotesModel> quotes)
        {
            base.AddRange(quotes);
        }

        private QuotePeriod ExtractPeriod()
        {
            if (this.Count > 1)
            {
                for (int i = 1; i < this.Count; i++)
                {
                    if (this[i - 1].Date.Subtract(this[i].Date).TotalDays < 2)
                    {
                        return QuotePeriod.Daily;
                    }
                }
                return QuotePeriod.Weekly;
            }
            else
            {
                return QuotePeriod.Daily;
            }
        }

        public void Next(QuotesModel quotes)
        {
            var first = this.First();
            var period = ExtractPeriod();

            Replace = false;
            if (quotes.Date > first.Date)
            {
                if (period == QuotePeriod.Daily)
                {
                    base.RemoveAt(Count - 1);
                    base.Insert(0, new QuotesModel
                    {
                        Date = quotes.Date,
                        Open = quotes.Open,
                        Close = quotes.Close,
                        High = quotes.High,
                        Low = quotes.Low,
                        Volume = quotes.Volume
                    });
                }
                else
                {
                    Func<DateTime, int> weekProjector = date => date.Year * 100 + CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

                    if (weekProjector(first.Date) == weekProjector(quotes.Date))
                    {
                        first.Date = quotes.Date;
                        first.Close = quotes.Close;
                        first.Low = Math.Min(first.Low, quotes.Low);
                        first.High = Math.Min(first.High, quotes.High);

                        Replace = true;
                    }
                    else
                    {
                        base.RemoveAt(Count - 1);
                        base.Insert(0, new QuotesModel
                        {
                            Date = quotes.Date,
                            Open = quotes.Open,
                            Close = quotes.Close,
                            High = quotes.High,
                            Low = quotes.Low,
                            Volume = quotes.Volume
                        });
                    }
                }
            }
        }


        public void Prev(QuotesModel quotes)
        {
            var last = this.Last();
            var period = ExtractPeriod();

            Replace = false;
            if (quotes.Date < last.Date)
            {
                if (period == QuotePeriod.Daily)
                {
                    base.RemoveAt(0);
                    base.Add(quotes);
                }
                else
                {
                    Func<DateTime, int> weekProjector = date => date.Year * 100 + CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

                    if (weekProjector(last.Date) == weekProjector(quotes.Date))
                    {
                        last.Date = quotes.Date;
                        last.Open = quotes.Open;
                        last.Low = Math.Min(last.Low, quotes.Low);
                        last.High = Math.Min(last.High, quotes.High);

                        Replace = true;
                    }
                    else
                    {
                        base.RemoveAt(0);
                        base.Add(quotes);
                    }
                }
            }
        }
    }
}