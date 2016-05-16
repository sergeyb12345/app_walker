namespace StockScanner.Interfaces.DomainModel.Financials
{
    public interface ICompanyFinancialsStats
    {
        #region FreeCashFlow Attributes

        /// <summary>
        ///     Net Cash from Operating Activities (in millions)
        ///     The cash generated from the operations of a company, generally defined as revenues less all operating expenses, but
        ///     calculated through a series of adjustments to net income. The OCF can be found on the statement of cash flows.
        ///     Also known as "cash flow provided by operations" or "cash flow from operating activities".
        /// </summary>
        double CashFlowFromOperations { get; }

        /// <summary>
        ///     Capital Expenditures (in millions)
        ///     Capital expenditures (CAPEX or capex) are expenditures creating future benefits.
        ///     A capital expenditure is incurred when a business spends money either to buy fixed assets or
        ///     to add to the value of an existing fixed asset with a useful life that extends beyond the taxable year.
        ///     Capex are used by a company to acquire or upgrade physical assets such as equipment, property, or industrial
        ///     buildings
        /// </summary>
        double CapitalExpenditures { get; }

        /// <summary>
        ///     The number of shares representing total company ownership, including common shares and
        ///     current conversion or exercised value of the preferred shares, options, warrants, and other convertible securities.
        /// </summary>
        double DilutedSharesOutstanding { get; }


        /// <summary>
        ///     Shareholders' equity comes from two main sources.
        ///     The first and original source is the money that was originally invested in the company, along with any additional
        ///     investments made thereafter.
        ///     The second comes from retained earnings which the company is able to accumulate over time through its operations.
        ///     In most cases, the retained earnings portion is the largest component.
        ///     1. ShareholderEquity = Total Assets - Total Liabilities
        ///     2. ShareholderEquity = Share Capital + Retained Earnings - Treasury Shares
        /// </summary>
        double ShareholderEquity { get; }

        double LongTermDebt { get; }

        double OtherLongTermDebts { get; }

        double RecentClosePrice { get; }

        #endregion
    }
}