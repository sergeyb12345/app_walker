using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace dream.walker.station.Publishers
{
    public class ConsolePublisher : IPublisher
    {
        public void Publish(string message)
        {
            Console.WriteLine(message);
            Thread.Sleep(10);
        }
    }

    public interface IPublisher
    {
        void Publish(string message);
    }
}
