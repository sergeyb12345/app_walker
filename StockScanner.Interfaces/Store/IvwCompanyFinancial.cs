namespace StockScanner.Interfaces.Store
{
    public interface IvwCompanyFinancial
    {
        int StockId { get; set; }

        string Ticker { get; set; }

        string CompanyName { get; set; }

        bool Active { get; set; }

        string IndustryName { get; set; }

        string SectorName { get; set; }

        double CapitalExpenditures { get; set; }

        double DilutedSharesOutstanding { get; set; }

        double ShareholderEquity { get; set; }

        double LongTermDebt { get; set; }

        double OtherLongTermDebts { get; set; }

        double CashFlowFromOperations { get; set; }

        double RecentClosePrice { get; set; }
    }
}