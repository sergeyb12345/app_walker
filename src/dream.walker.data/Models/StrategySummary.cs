using dream.walker.data.Entities.Strategies;

namespace dream.walker.data.Models
{
    public class StrategySummary
    {

        public StrategySummary()
        {
            
        }

        public StrategySummary(Strategy strategy)
        {
            StrategyId = strategy.StrategyId;
            Title = strategy.Name;
            Summary = strategy.Description;
            Url = strategy.Url;
            Active = strategy.Active;
        }

        public bool Active { get; set; }

        public string Url { get; set; }

        public string Summary { get; set; }

        public int StrategyId { get; set; }

        public string Title { get;  set; }
    }
}
