using System.Data.Entity;
using System.Threading.Tasks;

namespace dream.walker.data.Repositories
{
    public class DreamDbRepository<TEntity>: IDreamDbRepository<TEntity> where TEntity : class
    {
        protected DreamDbContext DbContext { get; private set; }
        protected DbSet<TEntity> Dbset { get; private set; }

        public DreamDbRepository(DreamDbContext dbContext)
        {
            DbContext = dbContext;
            Dbset = dbContext.Set<TEntity>();
        }

        public TEntity Add(TEntity entity)
        {
            return Dbset.Add(entity);
        }

        public void Delete(TEntity entity)
        {
            Dbset.Remove(entity);
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }
        public async Task CommitAsync()
        {
            await DbContext.SaveChangesAsync();
        }
    }

    public interface IDreamDbRepository<TEntity> where TEntity : class
    {
        TEntity Add(TEntity entity);
        void Delete(TEntity entity);
        void Commit();
        Task CommitAsync();
    }
}