using System.Collections.Generic;
using Autofac;
using dream.walker.data.Services;
using dream.walker.indicators;
using dream.walker.indicators.IndicatorParams;
using dream.walker.reader.Models;
using dream.walker.station.IoC;
using NUnit.Framework;

namespace dream.station.tests.Indicators
{
    [TestFixture]
    public class IndicatorTests
    {
        private static readonly List<QuotesModel> Quotes;

        static IndicatorTests()
        {
            var container = IoCContainer.Instance;
            var service = container.Resolve<ICompanyService>();
            Quotes = service.GetQuotes("A");
        }

        [Test]
        public void Ema_Calculate()
        {
            var ema = new Ema();

            var result = ema.Calculate(Quotes, 14);

            Assert.That(Quotes[0].Date == result[0].Date);
        }

        [Test]
        public void Macd_Calculate()
        {
            var macd = new Macd();

            var result = macd.Calculate(Quotes, new MacdParams {SlowEmaPeriod = 26, FastEmaPeriod = 12, SignalEmaPeriod = 9});

            Assert.That(Quotes[0].Date == result[0].Date);
        }

        [Test]
        public void ImpulseSystem_Calculate()
        {
            var macd = new ImpulseSystem();

            var result = macd.Calculate(Quotes, new ImpulseSystemParams
            {
                MacdParams = new MacdParams {SlowEmaPeriod = 26, FastEmaPeriod = 12, SignalEmaPeriod = 9},
                EmaPeriod = 13
            });

            Assert.That(Quotes[0].Date == result[0].Date);
        }
    }
}
