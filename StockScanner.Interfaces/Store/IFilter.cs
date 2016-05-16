using System;

namespace StockScanner.Interfaces.Store
{
    public interface IFilter
    {
        int Id { get; set; }

        string Name { get; set; }

        Guid? UserId { get; set; }

        bool Active { get; set; }

        string Description { get; set; }
    }
}