using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Runtime.Caching;
using dream.walker.reader.Models;


namespace dream.walker.space.Controllers
{
    public interface IDataCache
    {
        Task<T> Get<T>(string key, Func<Task<T>> func) where T : class;
        T Get<T>(string key, Func<T> func) where T : class;
        void Set<T>(string key, T data) where T : class;
    }

    public class DataCache : IDataCache
    {
        private readonly MemoryCache _cache;

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

        public T Get<T>(string key, Func<T> func) where T : class
        {
            var data = _cache.Get(key) as T;
            if (data == null)
            {
                data = func.Invoke();
                _cache.Add(key, data, DateTimeOffset.MaxValue);
            }

            return data;
        }

        public void Set<T>(string key, T data) where T : class
        {
            if (_cache.Contains(key))
            {
                _cache.Remove(key);
            }
            _cache.Add(key, data, DateTimeOffset.MaxValue);
        }
    }
}