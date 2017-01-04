using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Indicators;
using System.Data.Entity;
using dream.walker.data.Enums;
using System.Data.SqlClient;

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
        Task<List<Indicator>> GetAllAsync();
        Task<List<Indicator>> GetByStrategyIdAsync(int id);
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

        public async Task<List<Indicator>> GetAllAsync()
        {
            var records = await Dbset.Where(r => !r.Deleted).OrderBy(r => r.Name).ToListAsync();
            return records;
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

        public async Task<List<Indicator>> GetByStrategyIdAsync(int id)
        {
            var query = @"
                SELECT DISTINCT I.*
                FROM [dbo].[Indicator] I
	                INNER JOIN (
		                SELECT [DataSeriesV1] AS IndicatorId, [RuleId]
		                FROM [dbo].[Rule]
		                WHERE [DataSourceV1] = 0
		                UNION

		                SELECT [DataSeriesV2], [RuleId]
		                FROM [dbo].[Rule]
		                WHERE [DataSourceV2] = 0
	                ) R ON I.IndicatorId = R.IndicatorId
	                INNER JOIN [dbo].[RuleSetDetails] RS ON RS.RuleId = R.RuleId
	                INNER JOIN [dbo].[StrategyRuleSet] S ON S.RuleSetId = RS.RuleSetId
                WHERE I.Deleted = 0 AND S.StrategyId = @strategyId
            ";

            var records = await Dbset.SqlQuery(query, new[] { new SqlParameter("@strategyId", id) }).ToListAsync();
            return records;
        }
    }
}