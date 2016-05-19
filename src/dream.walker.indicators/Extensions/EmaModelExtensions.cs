using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.indicators.Extensions
{
    public static class EmaModelExtensions
    {
        public static List<EmaModel> Substract(this List<EmaModel> substractFrom, List<EmaModel> substractThis)
        {
            var result = from fromItem in substractFrom
                         join thisItem in substractThis
                         on fromItem.Date equals thisItem.Date
                         select new EmaModel {Date = fromItem.Date, Value = fromItem.Value - thisItem.Value };

            return result.ToList();
        }

        public static List<QuotesModel> AsQuotesModel(this List<EmaModel> list, QuoteModelField mapValueTo)
        {
            var result = new List<QuotesModel>();
            foreach (var model in list)
            {
                var item = new QuotesModel() {Date = model.Date};

                switch (mapValueTo)
                {
                    case QuoteModelField.Open:
                        item.Open = model.Value;
                        break;
                    case QuoteModelField.Close:
                        item.Close = model.Value;
                        break;
                    case QuoteModelField.High:
                        item.High = model.Value;
                        break;
                    case QuoteModelField.Low:
                        item.Low = model.Value;
                        break;
                    case QuoteModelField.Volume:
                        item.Volume = model.Value;
                        break;
                }

                result.Add(item);
            }

            return result;
        }
    }

    public enum QuoteModelField
    {
        Open,
        Close,
        High,
        Low,
        Volume
    }
}
