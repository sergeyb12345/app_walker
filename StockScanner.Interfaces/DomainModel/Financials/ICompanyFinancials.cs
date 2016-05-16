namespace StockScanner.Interfaces.DomainModel.Financials
{
    public interface ICompanyFinancials : ICompanyFinancialsStats, ICompanyFinancialsActions
    {
        int CompanyId { get; }

        string Ticker { get; }

        string CompanyName { get; }

        string IndustryName { get; }

        string SectorName { get; }


        bool FinancialsValidate();
    }
}