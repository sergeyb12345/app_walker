using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace StockScanner.Interfaces.Commands.StockFilter
{
    public interface IRegisterCommand
    {
        [Required]
        [StringLength(150)]
        [DisplayName("Filter Name")]
        string FilterName { get; }

        Guid UserId { get; }
    }
}