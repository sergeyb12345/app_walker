using StockScanner.Interfaces.DomainModel.Financials;

namespace StockScanner.Interfaces.Financials.Statements
{
    public interface ICompanyFinancialsService
    {
        ICompanyFinancialsStats ExtractCompanyAnnualFinancials(string ticker);
    }
}