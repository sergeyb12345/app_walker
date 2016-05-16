using System;
using System.Collections.Generic;
using StockScanner.Interfaces.DomainModel.Conditions;
using StockScanner.Interfaces.DomainModel.Filters;
using StockScanner.Interfaces.DomainModel.Financials;
using StockScanner.Interfaces.DomainModel.Scores;
using StockScanner.Interfaces.DomainModel.Stock;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainRepositories
{
    public interface IDomainQueryRepository
    {
        /// <summary>
        ///     get stockCompany  by stock Id
        /// </summary>
        /// <param name="stockId"></param>
        /// <returns></returns>
        IStockCompany StockCompany_GetById(int stockId);

        /// <summary>
        ///     Get Stock Company by Stock Ticker
        /// </summary>
        /// <param name="ticker"></param>
        /// <returns></returns>
        IStockCompany StockCompany_GetByTicker(string ticker);

        /// <summary>
        ///     Get All Companies
        /// </summary>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        List<IStockCompany> StockCompany_GetAll(int page, int pageSize);

        /// <summary>
        ///     Get companies for the industry
        /// </summary>
        /// <param name="industryId"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        List<IStockCompany> StockCompany_GetByIndustryId(int industryId, int page, int pageSize);

        /// <summary>
        ///     Get total count of registered companies
        /// </summary>
        /// <returns></returns>
        int StockCompany_Count();

        /// <summary>
        ///     Get last data sync date (historical data from internet)
        /// </summary>
        /// <returns></returns>
        DateTime HistoricalData_LastRunDate();

        /// <summary>
        ///     retrieve live qoute for specified company ticker from internet
        /// </summary>
        /// <param name="ticker"></param>
        /// <returns></returns>
        IStockQuote StockQuote_GetLiveQuote(string ticker);

        /// <summary>
        ///     retrieve historical data for specified company ticker from internet
        /// </summary>
        /// <param name="ticker"></param>
        /// <param name="period"></param>
        /// <returns></returns>
        IStockHistoricalData StockQuote_GetLiveHistoricalData(string ticker, EnumPeriodType period);

        /// <summary>
        ///     Get list of companies which comply with specified filter
        /// </summary>
        /// <param name="filterId"></param>
        /// <param name="page"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        List<IStockFilterCompany> StockCompany_GetByFilterId(int filterId, int page, int pageSize);

        /// <summary>
        ///     Get total company count which comply with specified filter
        /// </summary>
        /// <param name="filterId"></param>
        /// <returns></returns>
        int StockCompany_GetByFilterId_Count(int filterId);

        DateTime HistoricalData_LastRunDate(int stockId, EnumPeriodType period);

        List<IStockFilterIndicator> StockFilter_GetIndicators(int filterId);

        List<IStockIndicatorParamValue> StockFilterIndicator_GetParams(int filterIndicatorId);

        List<IStockIndicatorParam> StockIndicator_GetParams(int indicatorId);

        List<IStockQuote> StockQuote_GetStockQuotes(int companyId, EnumPeriodType period, int count, DateTime dateTested);

        List<IStockFilter> StockFilter_GetAll(Guid userId);

        List<IStockFilter> StockFilter_GetAllActive(Guid userId);

        IStockFilter StockFilter_GetById(int filterId);

        List<IFilterCondition> StockFilter_GetConditions(int filterId);

        IStockFilterIndicator StockFilterIndicator_GetById(int filterIndicatorId);

        List<IStockIndicator> StockIndicator_GetAll();

        IStockIndicator StockFilter_GetIndicatorByFormulaType(EnumFormulaType enumFormulaType);

        IFilterCondition StockFilterCondition_GetById(int conditionId);

        IStockIndicator StockIndicator_GetById(int indicatorId);

        bool StockCompany_IsValidated(int companyId, int filterId, DateTime dateTested);

        List<IScoreSummary> ScoreSummary_Get(List<int> filterIds, int successRate, DateTime dateTested, int pageIndex,
            int pageSize, out int totalRecords);

        bool StockFilter_IsValidated(int filterId, DateTime lastSyncDate);

        List<IScoreDetails> ScoreDetails_GetByCompanyId(int companyId, int filterId, DateTime dateTested);

        IScoreSummary ScoreSummary_Get(int uniqueId);

        List<ICompanyFinancials> CompanyFinancials_GetAll();

        DateTime Options_GetLastRunDate();
    }
}