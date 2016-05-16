using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using StockScanner.Interfaces.DomainModel.Conditions;
using StockScanner.Interfaces.Enumerators;

namespace StockScanner.Interfaces.DomainModel.Filters
{
    public interface IStockFilter : IDomainModel
    {
        int FilterId { get; }

        [Required]
        [StringLength(150)]
        [DisplayName("Filter Name")]
        string FilterName { get; }

        [Required]
        Guid UserId { get; }

        bool IsActive { get; }
        string Description { get; }


        List<IStockFilterIndicator> GetIndicators(bool refresh = false);

        void Register();
        void Delete();
        void ChangeName(string filterName, string description);
        int AppendIndicator(int indicatorId, string indicatorName, EnumPeriodType period, int orderId);

        List<IFilterCondition> GetConditions(bool refresh = false);

        void Disable();

        void Enable();

        bool IsValidated(DateTime lastSyncDate);
    }
}