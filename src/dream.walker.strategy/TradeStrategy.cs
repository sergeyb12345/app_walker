using System;
using System.Collections.Generic;
using dream.walker.data.Models;
using dream.walker.data.Repositories;
using dream.walker.data.Services;
using dream.walker.reader.Models;

namespace dream.walker.strategy
{
    public class TradeStrategy : ITradeStrategy
    {
        public TradeStrategy(IStrategyService strategyService)
        {
            
        }

        public List<TradeRule> MarketTideRules { get; set; }
        public void Validate(List<CompanyToProcess> companies)
        {
            throw new NotImplementedException();
        }
    }

    public interface ITradeStrategy
    {
        List<TradeRule> MarketTideRules { get; set; }
        void Validate(List<CompanyToProcess> companies);
    }

    public class TradeRule
    {
    }
}
