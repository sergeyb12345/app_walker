using Autofac;
using dream.walker.space.Controllers;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using dream.walker.data.Extensions;

namespace dream.walker.tests.Controllers
{
    [TestFixture]
    public class PlaygroundApiControllerTests
    {
        private PlaygroundApiController _controller;

        [SetUp]
        public void Setup()
        {
            _controller = IoCContainer.Instance.Resolve<PlaygroundApiController>();
        }

        [Test]
        public async Task LoadPlayground()
        {
            await _controller.LoadPlayground("A", 3);
            var quotes = _controller._quotes;

            var weekly = quotes.ToWeeekly();

            
        }
    }
}
