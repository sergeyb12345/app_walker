using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StockScanner.Interfaces.DomainModel.Stock
{
    public static class StockQuoteExtensions
    {
        public static string ToXml(this List<IStockQuote> items)
        {
            var quotes = items.OrderBy(d => d.Date).ToList();
            var sb = new StringBuilder();
            foreach (var item in quotes)
            {
                sb.AppendFormat(
                    "<quote id='{0}' high='{1}' low='{2}' open='{3}' close='{4}' volume='{5}' date='{6}' />",
                    quotes.IndexOf(item) + 1, item.HighValue, item.LowValue, item.OpenValue, item.CloseValue,
                    item.Volume, item.Date.ToString("yyyyMMdd"));
            }

            return string.Format("<quotes>{0}</quotes>", sb);
        }
    }
}