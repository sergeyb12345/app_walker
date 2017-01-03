using System;
using System.Threading.Tasks;
using System.Runtime.Caching;


namespace dream.walker.space.Controllers
{
    public interface IDataCache
    {
        Task<T> Get<T>(string key, Func<Task<T>> func) where T : class;
    }

    public class DataCache : IDataCache
    {
        private MemoryCache _cache;

        public DataCache()
        {
            _cache = MemoryCache.Default;
        }

        public async Task<T> Get<T>(string key, Func<Task<T>> func) where T: class
        {
            var data = _cache.Get(key) as T;
            if (data == null)
            {
                data = await func.Invoke();
                _cache.Add(key, data, DateTimeOffset.MaxValue);
            }

            return data;
        }
    }
}