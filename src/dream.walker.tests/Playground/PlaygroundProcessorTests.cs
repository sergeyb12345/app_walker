using System;
using System.Threading.Tasks;
using Autofac;
using dream.walker.playground;
using dream.walker.space.Controllers;
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

        [Test]
        public void Reset_ShouldCreateQuotes()
        {
            //_processor.Reset(100, DateTime.MinValue);
        }
    }
}
