using System;
using System.Collections.Generic;
using System.Linq;
using dream.walker.data.Entities.Strategies;
using dream.walker.data.Enums;
using dream.walker.indicators.Models;
using dream.walker.reader.Models;

namespace dream.walker.playground.Models
{
    public class StrategyRulesCalculator
    {
        private readonly List<vStrategyRule> _rules;
        private readonly Dictionary<QuotePeriod, ChartModel> _charts;

        public StrategyRulesCalculator(List<vStrategyRule> rules, Dictionary<QuotePeriod, ChartModel> charts)
        {
            _rules = rules;
            _charts = charts;
        }


        public List<StrategyRuleResult> Calculate()
        {
            var result = new List<StrategyRuleResult>();
            foreach (var rule in _rules)
            {
                var firstValue = GetFirstValue(rule);
                var secondValue = GetSecondValue(rule);

                var ruleResult = new StrategyRuleResult(rule);
                ruleResult.Compare(firstValue, secondValue);

                result.Add(ruleResult);
            }
            return result;
        }


        private decimal GetFirstValue(vStrategyRule rule)
        {
            switch (rule.DataSourceV1)
            {
                case DataSourceType.Indicator:
                    return GetValueFromIndicator(rule, true);
                case DataSourceType.HistoricalData:
                    return GetValueFromHistorical(rule, true);
                case DataSourceType.Constant:
                    return decimal.Parse(rule.ConstV1);
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
        private decimal GetSecondValue(vStrategyRule rule)
        {
            switch (rule.DataSourceV2)
            {
                case DataSourceType.Indicator:
                    return GetValueFromIndicator(rule, false);
                case DataSourceType.HistoricalData:
                    return GetValueFromHistorical(rule, false);
                case DataSourceType.Constant:
                    return decimal.Parse(rule.ConstV2);
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private decimal GetValueFromHistorical(vStrategyRule rule, bool isFirst)
        {
            var values = isFirst ? _charts[rule.Period].Quotes.Skip(rule.SkipItemsV1).Take(rule.TakeItemsV1).ToList() 
                : _charts[rule.Period].Quotes.Skip(rule.SkipItemsV2).Take(rule.TakeItemsV2).ToList();

            var result = CalculateHistoricalValue(values, isFirst ? rule.TransformItemsV1 : rule.TransformItemsV2,
                isFirst ? (HistoricalDataSeriesType) rule.DataSeriesV1 : (HistoricalDataSeriesType) rule.DataSeriesV2);

            return result;
        }

        private decimal CalculateHistoricalValue(List<QuotesModel> quotes, TransformFunction transform, HistoricalDataSeriesType dataSeries)
        {
            List<decimal> values;

            switch (dataSeries)
            {
                case HistoricalDataSeriesType.Open:
                    values = quotes.Select(q => q.Open).ToList();
                    break;
                case HistoricalDataSeriesType.Close:
                    values = quotes.Select(q => q.Close).ToList();
                    break;
                case HistoricalDataSeriesType.High:
                    values = quotes.Select(q => q.High).ToList();
                    break;
                case HistoricalDataSeriesType.Low:
                    values = quotes.Select(q => q.Low).ToList();
                    break;
                case HistoricalDataSeriesType.Volume:
                    values = quotes.Select(q => q.Volume).ToList();
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(dataSeries), dataSeries, null);
            }

            switch (transform)
            {
                case TransformFunction.First:
                    return values.First();

                case TransformFunction.Max:
                    return values.Max(v => v);

                case TransformFunction.Min:
                    return values.Min(v => v);

                case TransformFunction.Sum:
                    return values.Sum(v => v);

                case TransformFunction.Avg:
                    return values.Average(v => v);

                default:
                    throw new ArgumentOutOfRangeException(nameof(transform), transform, null);
            }
        }

        private decimal GetValueFromIndicator(vStrategyRule rule, bool isFirst)
        {
            var indicator = _charts[rule.Period].Indicators
                .Where(i => i.Key == (isFirst ? rule.DataSeriesV1 : rule.DataSeriesV2))
                .Select(i => i.Value)
                .FirstOrDefault();

            if (indicator != null)
            {
                var values = indicator.Values
                    .Skip(isFirst ? rule.SkipItemsV1 : rule.SkipItemsV2)
                    .Take(isFirst ? rule.TakeItemsV1 : rule.TakeItemsV2)
                    .ToList();

                return GetValueFromIndicator(rule, values, isFirst);
            } 

            return decimal.MinValue;
        }

        private decimal GetValueFromIndicator(vStrategyRule rule, List<IndicatorModel> values, bool isFirst)
        {
            var transform = isFirst ? rule.TransformItemsV1 : rule.TransformItemsV2;
            switch (transform)
            {
                case TransformFunction.First:
                    return values.Select(i => i.Value).First();
                case TransformFunction.Max:
                    return values.Max(i => i.Value);
                case TransformFunction.Sum:
                    return values.Sum(i => i.Value);
                case TransformFunction.Avg:
                    return values.Average(i => i.Value);
                case TransformFunction.Min:
                    return values.Min(i => i.Value);
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}