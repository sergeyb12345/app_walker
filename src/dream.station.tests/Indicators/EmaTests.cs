using System.Collections.Generic;
using Autofac;
using dream.walker.data.Services;
using dream.walker.indicators;
using dream.walker.reader.Models;
using dream.walker.station.IoC;
using NUnit.Framework;

namespace dream.station.tests.Indicators
{
    [TestFixture]
    public class EmaTests
    {
        private static readonly List<QuotesModel> Quotes;

        static EmaTests()
        {
            var container = IoCContainer.Instance;
            var service = container.Resolve<ICompanyService>();
            Quotes = service.GetQuotes("A");
        }

        [Test]
        public void Calculate()
        {
            var ema = new Ema();

            var result = ema.Calculate(Quotes, 14);

            Assert.That(Quotes[0].Date == result[0].Date);
        }

    }
}
