using System;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.Store
{
    public interface IStoreCommandRepository
    {
        void StockCompany_Register(string ticker, string companyName, string exchangeName, string industryName,
            string sectorName, int? exchangeId, int? industryId, int? sectorId, out int companyId,
            out string message);

        void StockCompany_UnRegister(int? companyId, out int status, out string message);

        void StockCompany_Activate(int? companyId, out int status, out string message);

        void StockCompany_DeActivate(int? companyId, out int status, out string message);

        void StockQuote_Register(int companyId, double openValue, double highValue, double lowValue, double closeValue,
            int volume, EnumPeriodType perionId, DateTime date);

        void StockFilter_Register(string filterName, string description, Guid userId, out int status, out string message);

        void StockFilter_UnRegister(int filterId, out int status, out string message);

        void StockFilter_ChangeName(int filterId, string filterName, string description, out int status,
            out string message);

        void StockFilter_AppendIndicator(int filterId, int indicatorId, string indicatorName, int period, int orderId,
            out int status, out string message);

        void StockFilter_ChangeIndicatorName(int id, string indicatorName, out int status, out string message);

        void StockFilter_RemoveIndicatorFromFilter(int filterIndicatorId, out int status, out string message);

        void StockFilter_ChangeIndicatorPeriod(int id, int period, out int status, out string message);

        void StockFilter_SetParamValue(int paramId, int filterIndicatorId, double value, out int status,
            out string message);

        void StockFilter_SetParamDefaultValue(int paramId, double value, out int status, out string message);

        void FilterCondition_Register(int filterId, int conditionId, string conditionName, int compareHow,
            bool important,
            int whatCompareSource, double? whatConstantValue, int? whatPeriodType, int? whatQuoteType,
            int? whatFilterIndicatorId, string whatIndicatorChartName, int? whatBarOffset, int? whatFinancialsType,
            int withCompareSource, double? withConstantValue, int? withPeriodType, int? withQuoteType,
            int? withFilterIndicatorId, string withIndicatorChartName, int? withBarOffset, int? withFinancialsType,
            out int compareValueId, out string message);

        void StockFilter_SetStatus(int filterId, bool isActive, out int status, out string message);

        void FilterCondition_Remove(int conditionId);

        void ScoreDetails_Register(int stockId, int conditionId, bool isValid, DateTime dateTested);

        void FilterCondition_Move(int conditionId, bool moveUp);

        void ScoreResult_Register(int filterId, int stockId, int scoreRate, string xmlDetails, DateTime dateTested);

        void CompanyFinancials_Register(int companyId, double capitalExpenditures, double dilutedSharesOutstanding,
            double shareholderEquity, double longTermDebt, double otherLongTermDebts, double cashFlowFromOperations,
            double recentClosePrice);

        void Options_SetLastRunDate(DateTime date);

        void HistData_RemoveLastWeek();
    }
}