using System;
using System.Linq;
using System.Text;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Enums;
using dream.walker.data.Repositories;
using dream.walker.space.Services.Models;
using dream.walker.space.Services.Requests;

namespace dream.walker.space.Services
{
    public class ChartDataService : IChartDataService
    {
        private readonly ICompanyRepository _companyRepository;
        private readonly ICompanyIndicatorRepository _companyIndicatorRepository;
        private readonly IIndicatorRepository _indicatorRepository;

        public ChartDataService(ICompanyRepository companyRepository,
            ICompanyIndicatorRepository companyIndicatorRepository,
            IIndicatorRepository indicatorRepository)
        {
            _companyRepository = companyRepository;
            _companyIndicatorRepository = companyIndicatorRepository;
            _indicatorRepository = indicatorRepository;
        }

        public ChartDataResult GetChartData(GetChartDataRequest request)
        {
            Company company = null;
            var message = new StringBuilder();
            var result = new ChartDataResult();
            var chartData = new ChartDataModel();

            try
            {
                company = _companyRepository.Get(request.Ticker);
                var chartPlot = chartData.GetChartPlot(0);

                var chartIndicator = chartPlot.AttachIndicator();
                chartIndicator.ChartType = ChartType.Ohlc;
                chartIndicator.ChartName = $"{company.Ticker} - {company.Name} {request.QuotePeriod}";
                chartIndicator.ChartHeader = new[] {"open", "high", "low", "close"};
                chartIndicator.ChartData = company.HistoryQuotes
                    .Select(q => $"'{q.Date:s}','{q.Open}','{q.High}',{q.Low}','{q.Close}'").ToArray();
            }
            catch (Exception ex)
            {
                message.AppendLine($"Failed to get company: {request.Ticker}. Error: {ex.Message}");
                result.Status.StatusCode = StatusCode.Error;
            }

            if (company != null && company.Ticker.Equals(request.Ticker, StringComparison.OrdinalIgnoreCase))
            {
                try
                {
                    var indicators = _indicatorRepository.GetAll();
                    foreach (var indicator in indicators.Where(i => i.Period == request.QuotePeriod && !i.Deleted))
                    {
                        try
                        {
                            var companyIndicator = _companyIndicatorRepository.Get(request.Ticker, indicator.IndicatorId);
                            if (companyIndicator != null && companyIndicator.IndicatorId == indicator.IndicatorId)
                            {
                                var chartPlot = chartData.GetChartPlot(indicator.ChartPlotNumber);

                                var chartIndicator = chartPlot.AttachIndicator();
                                chartIndicator.ChartType = indicator.ChartType;
                                chartIndicator.ChartColor = indicator.ChartColor;
                                chartIndicator.ChartName = $"{indicator.Name} - {indicator.JsonParams} {request.QuotePeriod}";
                                chartIndicator.ChartHeader = new[] { "value" };
                                chartIndicator.ChartData = companyIndicator.Data
                                    .Select(q => $"'{q.Date:s}','{q.Value}'").ToArray();

                            }

                        }
                        catch (Exception ex)
                        {
                            message.AppendLine($"Failed to get company indicator: {request.Ticker} - {indicator.Name}. Error: {ex.Message}");
                            result.Status.StatusCode = StatusCode.Warn;
                        }
                    }
                }
                catch (Exception ex)
                {
                    message.AppendLine($"Failed to get list of defined indicators. Error: {ex.Message}");
                    result.Status.StatusCode = StatusCode.Error;
                }
            }

            result.Status.Message = message.ToString();
            result.Result = chartData;

            return result;
        }
    }
}