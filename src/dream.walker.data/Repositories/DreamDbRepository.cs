using System.Data.Entity;

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

        public void Add(TEntity entity)
        {
            Dbset.Add(entity);
        }

        public void Delete(TEntity entity)
        {
            Dbset.Remove(entity);
        }

        public void Commit()
        {
            DbContext.SaveChanges();
        }
    }

    public interface IDreamDbRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Delete(TEntity entity);
        void Commit();
    }
}