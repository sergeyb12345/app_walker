using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Enums;
using dream.walker.reader.Models;

namespace dream.walker.data.Extensions
{
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

        public static List<QuotesModel> ConvertToPeriod(this List<QuotesModel> dailyQuotes, QuotePeriod quotePeriod)
        {
            if (quotePeriod == QuotePeriod.Weekly)
            {
                if (dailyQuotes.Any())
                {
                    var weeklyQuotes = new List<QuotesModel>();
                    var queue = new Queue<QuotesModel>(dailyQuotes);

                    if (queue.Peek().Date.Hour > 1)
                    {
                        weeklyQuotes.Add(queue.Dequeue());
                    }

                    var startDate = queue.Peek().Date;
                    var quotes = new List<QuotesModel>();

                    foreach (var item in queue)
                    {
                        if (quotes.Any() && startDate.AddDays(-7) <= item.Date)
                        {
                            var weeklyQuote = new QuotesModel
                            {
                                Date = startDate,
                                Open = quotes.First().Open,
                                Close = quotes.Last().Close,
                                Low = quotes.Lowest(),
                                High = quotes.Highest()
                            };

                            weeklyQuotes.Add(weeklyQuote);

                            startDate = startDate.AddDays(-7);
                            quotes = new List<QuotesModel>();
                        }
                        else
                        {
                            quotes.Add(item);
                        }
                    }

                    return weeklyQuotes;
                }
                return new List<QuotesModel>();

            }

            return dailyQuotes;
        }
    }
}
