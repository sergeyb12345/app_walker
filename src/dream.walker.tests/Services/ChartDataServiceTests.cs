using Autofac;
using dream.walker.data.Enums;
using dream.walker.space.Services;
using dream.walker.space.Services.Requests;
using NUnit.Framework;

namespace dream.walker.tests.Services
{
    [TestFixture]
    public class ChartDataServiceTests
    {
        private IChartDataService _service;

        [SetUp]
        public void Setup()
        {
            _service = IoCContainer.Instance.Resolve<IChartDataService>();
        }

        [Test]
        public void GetData_()
        {
            var response = _service.GetChartData(new GetChartDataRequest()
            {
                QuotePeriod = QuotePeriod.Daily,
                Ticker = "A"
            });
        }


       
    }
}
