using System;

namespace StockScanner.Interfaces.DomainModel.Stock
{
    public interface IStockCompany : IDomainModel
    {
        int Id { get; }
        string Ticker { get; }
        string CompanyName { get; }
        string IndustryName { get; }
        string SectorName { get; }
        string ExchangeName { get; }
        int? IndustryId { get; }
        int? ExchangeId { get; }
        int? SectorId { get; }
        void Register();
        void UnRegister();
        void Activate();
        void DeActivate();

        bool IsValidated(int p, DateTime lastSyncDate);
    }
}