using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StockScanner.Interfaces.Commands.StockCompany
{
    public interface IRegisterCommand
    {
        [Required]
        [StringLength(50)]
        [DisplayName("Company Ticker")]
        string Ticker { get; }

        [Required]
        string CompanyName { get; }

        [StringLength(150)]
        string ExchangeName { get; }

        [StringLength(150)]
        string IndustryName { get; }

        [StringLength(150)]
        string SectorName { get; }

        int? IndustryId { get; }
        int? SectorId { get; }
        int? ExchangeId { get; }
    }
}