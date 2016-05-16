using System;
using System.Linq;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.Store
{
    public interface IStoreQueryRepository
    {
        IQueryable<IVwStockCompany> StockCompanies { get; }

        IQueryable<IvwStockFilterCompany> StockFilterCompanies { get; }

        IQueryable<IvwStockFilterIndicator> StockFilterIndicators { get; }

        IQueryable<IvwStockIndicatorParam> StockIndicatorParams { get; }

        IQueryable<IIndicator> StockIndicators { get; }

        IQueryable<IvwFilterCondition> FilterConditions { get; }

        IQueryable<IvwStockQuote> StockQuotesDaily { get; }

        IQueryable<IvwStockQuote> StockQuotesWeekly { get; }

        IQueryable<IFilter> StockFilters { get; }

        IQueryable<IvwStockFilterIndicatorParam> StockFilterIndicatorParams { get; }

        IQueryable<IvwStockFilterScoreSummary> StockFilterScoreSummaries { get; }

        IQueryable<IvwStockFilterScoreDetail> StockFilterScoreDetails { get; }

        IQueryable<IvwCompanyFinancial> CompanyFinancials { get; }

        DateTime HistoricalData_LastRunDate();

        DateTime HistoricalData_LastRunDate(int stockId, EnumPeriodType period);

        IQueryable<IvwStockFilterScoreSummary> StockFilterScoreSummaries_Get(string filterIdsXml, int successRate,
            DateTime dateTested, int pageIndex, int pageSize, out int totalRecords);

        bool StockFilter_IsValidated(int filterId, DateTime lastSyncDate);

        IQueryable<IvwStockFilterScoreDetail> ScoreDetails_GetByCompanyId(int companyId, int filterId,
            DateTime dateTested);

        DateTime Options_GetLastRunDate();
    }
}