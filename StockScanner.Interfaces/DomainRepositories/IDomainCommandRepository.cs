using System;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainRepositories
{
    public interface IDomainCommandRepository
    {
        void StockCompanyRegister(string ticker, string companyName, string exchangeName, string industryName,
            string sectorName, int? exchangeId, int? industryId, int? sectorId);

        void StockQuoteRegister(int companyId, double openValue, double highValue, double lowValue, double closeValue,
            int volume, EnumPeriodType perionId, DateTime date);

        void StockCompanyDeActivate(int companyId);

        void StockFilterRegister(string filterName, string description, Guid userId);

        void StockFilterUnRegister(int filterId);

        void StockFilterChangeName(int filterId, string filterName, string description);

        int StockFilterAppendIndicator(int filterId, int indicatorId, string indicatorName, EnumPeriodType period,
            int orderId);

        void StockCompanyUnRegister(int companyId);

        void StockFilterChangeIndicatorName(int id, string indicatorName);

        void StockFilter_RemoveIndicatorFromFilter(int filterIndicatorId);

        void StockFilter_ChangeIndicatorPeriod(int id, int period);

        void StockFilter_SetParamValue(int paramId, int filterIndicatorId, double value);

        void StockFilter_SetParamDefaultValue(int paramId, double value);

        void StockCompany_Activate(int companyId);

        void FilterCondition_Register(int filterId, int conditionId, string conditionName, int compareHow,
            bool important,
            int whatCompareSource, double? whatConstantValue, int? whatPeriodType, int? whatQuoteType,
            int? whatFilterIndicatorId, string whatIndicatorChartName, int? whatBarOffset, int? whatFinancialsType,
            int withCompareSource, double? withConstantValue, int? withPeriodType, int? withQuoteType,
            int? withFilterIndicatorId, string withIndicatorChartName, int? withBarOffset, int? withFinancialsType);

        void StockFilter_SetStatus(int filterId, bool isActive);

        void FilterCondition_Remove(int conditionId);

        void ScoreDetails_Register(int stockId, int conditionId, bool isValid, DateTime dateTested);

        void FilterCondition_MoveUp(int conditionId);

        void FilterCondition_MoveDown(int conditionId);

        void ScoreResult_Register(int filterId, int stockId, int scoreRate, string xmlDetails, DateTime dateTested);

        void CompanyFinancials_Register(int companyId, double capitalExpenditures, double dilutedSharesOutstanding,
            double shareholderEquity, double longTermDebt, double otherLongTermDebts, double cashFlowFromOperations,
            double recentClosePrice);

        void Options_SetLastRunDate(DateTime date);

        void HistData_RemoveLastWeek();
    }
}