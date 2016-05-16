namespace StockScanner.Interfaces.DomainModel.Financials
{
    public interface ICompanyFinancialsActions
    {
        #region Model Actions

        void Register();

        #endregion

        #region FreeCashPrice Calculations

        /// <summary>
        ///     Calc FreeCashFlow = CashFlowFromOperations - CapitalExpenditures
        /// </summary>
        /// <returns></returns>
        double FreeCashFlow();

        /// <summary>
        ///     Calc FreeCashFlowRatio = FreeCashFlow / DilutedSharesOutstanding
        ///     Note:  by only buying stocks that were selling for 15 times their price to free cash flow or less one would have
        ///     substantially beat the DJIA 30 by a very large margin compared to buying the entire Index.
        ///     Important:
        ///     Price to Free Cash Flow (FreeCashFlowRatio) tells us how to use Free Cash Flow when dealing with the stock market
        ///     price and
        ///     FROIC tells us how to deal with it on Main Street.
        ///     Thus if you get a strong FROIC and a low Price to Free Cash Flow number or or strong Free Cash Flow yield, your
        ///     probability of success increases tremendously.
        /// </summary>
        /// <closingPrice>Stock recent closing price</closingPrice>
        /// <returns></returns>
        double FreeCashFlowToPriceRatio();

        /// <summary>
        ///     Invested Capital represents the total cash investment that shareholders and debtholders have made in a company.
        ///     There are two different but completely equivalent methods for calculating invested capital:
        ///     1.  The operating approach is calculated as:
        ///     Invested capital = Operating Net Working Capital + Net Property, Plant & Equipment + Capitalized Operating Leases +
        ///     Other Operating Assets + Operating Intangibles – Other Operating Liabilities – Cumulative Adjustment for
        ///     Amortization of R&D
        ///     2. The financing approach is calculated as:
        ///     Invested capital = Total Debt and Leases + Total Equity and Equity Equivalents - Non-Operating Cash and Investments
        /// </summary>
        double TotalInvestedCapital();

        /// <summary>
        ///     FROIC: Free Cash Flow Return on Invested Capital.
        ///     FROIC = Free Cash Flow / Total Capital
        ///     FROIC tells us how to use Free Cash Flow when dealing on Main Street.
        ///     Note: if you get a strong FROIC and a low Price to Free Cash Flow number or or strong Free Cash Flow yield, your
        ///     probability of success increases tremendously.
        ///     Example:
        ///     If FROIC = 0.61 (61%) it means:
        ///     For every $1 of total capital employed, company generates 61 cents in free cash flow.
        /// </summary>
        /// <returns></returns>
        double FROIC();

        #endregion
    }
}