using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Autofac;
using dream.walker.data.Entities;
using dream.walker.station.Processors.Calculators;

namespace dream.walker.station.Processors.IndicatorProcessor
{
    public class IndicatorProcessorFactory
    {
        private readonly IEnumerable<IIndicatorCalculator> _calculators;

        public IndicatorProcessorFactory(ILifetimeScope container)
        {
            _calculators = container.Resolve<IEnumerable<IIndicatorCalculator>>();
        }

        public IIndicatorCalculator Create(Indicator indicator)
        {
            return _calculators.FirstOrDefault(calculator => calculator.CanCalculate(indicator));
        }
    }
}