using System;

namespace StockScanner.Interfaces.DomainModel.Common
{
    public interface IProjectOptions
    {
        DateTime LastSyncDate { get; }
        void SetLastSyncDate(DateTime date);
    }
}