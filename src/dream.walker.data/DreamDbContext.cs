using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using dream.walker.data.Entities;

namespace dream.walker.data
{
    public class DreamDbContext: DbContext
    {
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().HasKey(e => e.Ticker);
            modelBuilder.Entity<Company>().Property(e => e.Name).IsRequired();

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Company> Companies { get; set; }
    }
}
