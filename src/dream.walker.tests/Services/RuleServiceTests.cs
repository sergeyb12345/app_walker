using System.Threading.Tasks;
using Autofac;
using dream.walker.data.Enums;
using dream.walker.data.Services;
using NUnit.Framework;

namespace dream.walker.tests.Services
{
    [TestFixture]
    public class RuleServiceTests
    {
        private IRuleService _service;

        [SetUp]
        public void Setup()
        {
            _service = IoCContainer.Instance.Resolve<IRuleService>();
        }

        [Test]
        public async Task GetStrategyRuleSetsAsync()
        {
            var response = await _service.GetStrategyRuleSetsAsync(1, QuotePeriod.Daily);
        }
    }
}
