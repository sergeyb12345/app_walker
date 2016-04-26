using System.Threading;

namespace dream.walker.station
{
    public interface IProcess
    {
        void Start(CancellationToken token);
    }
}