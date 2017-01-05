﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.reader.Models;

namespace dream.walker.data.Extensions
{
    public static class DateTimeExtentions
    {
        public static int ToInt(this DateTime date)
        {
            return date.Year * 10000 + date.Month * 100 + date.Day;
        }
    }

    public static class QuotesModelExtensions
    {
        public static decimal Lowest(this List<QuotesModel> quotes)
        {
            decimal result = -1;

            if (quotes.Any())
            {
                result = quotes.First().Low;
                foreach (var quote in quotes)
                {
                    if (result > quote.Low)
                    {
                        result = quote.Low;
                    }
                }
            }

            return result;
        }

        public static decimal Highest(this List<QuotesModel> quotes)
        {
            decimal result = -1;

            if (quotes.Any())
            {
                result = quotes.First().High;
                foreach (var quote in quotes)
                {
                    if (result < quote.High)
                    {
                        result = quote.High;
                    }
                }
            }

            return result;
        }

        public static List<QuotesModel> Merge(this List<QuotesModel> quotes, List<QuotesModel> mergeWith)
        {
            var result = new List<QuotesModel>();

            if (!quotes.Any())
            {
                if (mergeWith != null && mergeWith.Any())
                {
                    result.AddRange(mergeWith);
                }
            }
            else
            {
                result.AddRange(quotes);
                if (mergeWith != null && mergeWith.Any())
                {
                    var oldest = quotes.Last().Date;
                    var missingQuotes = mergeWith.Where(q => q.Date < oldest).ToList();
                    if (missingQuotes.Any())
                    {
                        result.AddRange(missingQuotes);
                        result = result.OrderByDescending(q => q.Date).ToList();
                    }
                }
            }
            return result;
        }

        public static List<QuotesModel> TakeLast(this List<QuotesModel> quotes, int items)
        {
            if (quotes != null && quotes.Any())
            {
                return quotes.Skip(Math.Max(0, quotes.Count() - items)).ToList();
            }
            return new List<QuotesModel>();
        }

        public static List<QuotesModel> ToWeeekly(this List<QuotesModel>quotes)
        {
            var result = new List<QuotesModel>();

            Func<DateTime, int> weekProjector = date => date.Year * 100 + CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
            var weeks = from quote in quotes group quote by weekProjector(quote.Date);

            foreach (var week in weeks)
            {
                if (week.Any())
                {
                    var weeklyQuote = new QuotesModel
                    {
                        Open = week.First().Open,
                        Close = week.Last().Close,
                        Volume = week.Sum(w => w.Volume),
                        Date = week.Last().Date,
                        High = week.Max(w => w.High),
                        Low = week.Min(w => w.Low)
                    };

                    result.Add(weeklyQuote);
                }
            }

            return result;
        }

    }
}
