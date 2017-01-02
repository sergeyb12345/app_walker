using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using dream.walker.data.Extensions;
using dream.walker.data.Models;
using dream.walker.data.Requests;
using dream.walker.data.Services;
using dream.walker.reader;
using dream.walker.stock;
using dream.walker.stock.Requests;

namespace dream.walker.space.Controllers
{

    [RoutePrefix("api/stock")]
    public class StockApiController : ApiController
    {
        private readonly IMarketStockClient _stockClient;
        private readonly ICompanyService _companyService;
        private readonly IQuotesFileReader _fileReader;

        public StockApiController(IMarketStockClient stockClient, ICompanyService companyService, IQuotesFileReader fileReader)
        {
            _stockClient = stockClient;
            _companyService = companyService;
            _fileReader = fileReader;
        }


        [HttpPut]
        [Route("{ticker}/update-quotes")]
        public async Task<IHttpActionResult> UpdateQuotes(string ticker)
        {
            var company = await _companyService.GetAsync(ticker);
            if (company != null)
            {
                var update = new CompanyToUpdate
                {
                    Ticker = company.Ticker,
                    LastUpdated = company.LastUpdated,
                    HistoryQuotes = company.HistoryQuotes
                };

                if (!company.HistoryQuotes.Any())
                {
                    update.LastUpdated = DateTime.Today.AddYears(-1);
                }

                var request = new GetStockHistoryRequest(update);

                var csvQuotes = await _stockClient.GetStockHistory(request);
                var quotes = _fileReader.Read(csvQuotes);
                quotes = quotes.Merge(company.HistoryQuotes).Where(q => q.Date > DateTime.Today.AddYears(-1)).ToList();

                _companyService.UpdateQuotes(new UpdateQuotesRequest(company.Ticker, quotes));
            }

            return Ok();
        }
    }
}
