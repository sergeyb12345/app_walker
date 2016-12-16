using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Indicators;
using System.Data.Entity;
using dream.walker.data.Enums;

namespace dream.walker.data.Repositories
{
    public interface IIndicatorRepository
    {
        Indicator Get(int id);
        List<Indicator> GetAll();
        Indicator Add(Indicator indicator);
        void Commit();
        Task<Indicator> GetAsync(int id);
        void Delete(Indicator record);
        Task CommitAsync();
        Task<List<Indicator>> GetAllAsync(QuotePeriod period);
    }


    public class IndicatorRepository : DreamDbRepository<Indicator>, IIndicatorRepository
    {
        public IndicatorRepository(DreamDbContext dbContext) : base(dbContext)
        {
        }

        public Indicator Get(int id)
        {
            var record = Dbset.FirstOrDefault(r => r.IndicatorId == id);
            return record;
        }

        public List<Indicator> GetAll()
        {
            var indicators = Dbset.Where(i => !i.Deleted).ToList();
            return indicators;
        }

        public async Task<List<Indicator>> GetAllAsync(QuotePeriod period)
        {
            var records = await Dbset.Where(r => r.Period == period && !r.Deleted).OrderBy(r => r.Name).ToListAsync();
            return records;
        }

        public async Task<Indicator> GetAsync(int id)
        {
            var record = await Dbset.FirstOrDefaultAsync(r => r.IndicatorId == id);
            return record;
        }
    }
}