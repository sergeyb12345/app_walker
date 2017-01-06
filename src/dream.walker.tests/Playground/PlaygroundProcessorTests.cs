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
                var controller = IoCContainer.Instance.Resolve<PlaygroundApiController>();
                await controller.LoadPlayground("A", 3);

                _processor = controller._playgroundProcessor;
            }
        }

        [Test]
        public void Reset_ShouldCreateQuotes()
        {
            _processor.Reset(200, DateTime.MinValue);
        }
    }
}
