using System;
using dream.walker.stock.Enums;

namespace dream.walker.stock.Requests
{
    public class GetStockHistoryRequest
    {
        //private const int MaxHistoryPeriodInMonths = 12;

        public GetStockHistoryRequest() { }


        public GetStockHistoryRequest(string ticker, DateTime lastUpdated)
        {
            Ticker = ticker;

            if (lastUpdated.AddYears(2) < DateTime.Today)
            {
                lastUpdated = DateTime.Today.AddYears(-2);
            }

            FromDate = lastUpdated;
            if (FromDate.AddMonths(1) > DateTime.Today)
            {
                FromDate = DateTime.Today.AddMonths(-1);
            }

            var months = 0;
            var years = 1;

            while (lastUpdated < DateTime.Today)
            {
                months += 1;
                if (months%12 == 0)
                {
                    years += 1;
                }
                lastUpdated = lastUpdated.AddMonths(1);
            }

            if (years > 1)
            {
                TimeFrame = QuoteTimeFrame.Year;
                if (years > 2)
                {
                    years = 2;
                }
                TimeFrameValue = years;
            }
            else
            {
                TimeFrame = QuoteTimeFrame.Month;
                TimeFrameValue = months;
            }
        }


        public QuoteTimeFrame TimeFrame { get; set; }
        public int TimeFrameValue { get; set; }
        public string Ticker { get; set; }
        public DateTime FromDate { get; set; }
    }
}