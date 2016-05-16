using System.Threading;

namespace StockScanner.Interfaces.Helpers
{
    public class ThreadHelper
    {
        public static void StartBackgroundThread(ThreadStart threadStart)
        {
            if (threadStart != null)
            {
                var thread = new Thread(threadStart);
                thread.IsBackground = true;
                thread.Start();
            }
        }
    }
}