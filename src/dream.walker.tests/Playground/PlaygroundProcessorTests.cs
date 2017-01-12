using System;
using System.Linq;
using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Enums;
using dream.walker.playground;
using dream.walker.playground.Models;
using NUnit.Framework;

namespace dream.walker.tests.Playground
{
    [TestFixture]
    public class PlaygroundProcessorTests
    {
        private PlaygroundProcessor _processor = null;

        [SetUp]
        public async Task Setup()
        {
            if (_processor == null)
            {
                var controller = IoCContainer.Instance.Resolve<IPlaygroundService>();
                _processor = await controller.LoadPlaygroundAsync("A", 3, true);
            }
        }

        public void Reset_ShouldCreateQuotes()
        {
            Assert.That(_processor.HistoryDays > 300);
        }


        public void Initialize_ShouldReturn_PlaygroundChartModel()
        {
            var response = _processor.Initialize(200, DateTime.MinValue);

            PlaygroundChartModel.ChartInfo dailyChart = response.Periods[(int) QuotePeriod.Daily];
            PlaygroundChartModel.ChartInfo weeklyChart = response.Periods[(int) QuotePeriod.Weekly];

            Assert.That(dailyChart.Quotes.Count == 200);
            Assert.That(weeklyChart.Quotes.Count == 200);

            foreach (var indicatorInfo in dailyChart.Indicators)
            {
                Assert.That(indicatorInfo.Values.First().Date == dailyChart.Quotes.First().Date);
            }

            foreach (var indicatorInfo in weeklyChart.Indicators)
            {
                Assert.That(indicatorInfo.Values.First().Date == weeklyChart.Quotes.First().Date);
            }

            Assert.That(weeklyChart.Quotes.First().Date == dailyChart.Quotes.First().Date);
        }


        [Test]
        public void Move_ShouldReturn_PlaygroundChartModel_For_xxx_bars()
        {
            var initial = _processor.Initialize(200, DateTime.MinValue);
            var response = _processor.Next(10);

            PlaygroundChartModel.ChartInfo dailyChart = response.Periods[(int)QuotePeriod.Daily];
            PlaygroundChartModel.ChartInfo weeklyChart = response.Periods[(int)QuotePeriod.Weekly];

            Assert.That(dailyChart.Quotes.Count == 10 + 1);
        }
    }
}
