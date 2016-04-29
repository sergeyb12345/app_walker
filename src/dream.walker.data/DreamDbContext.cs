using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using dream.walker.data.Entities;

namespace dream.walker.data
{
    public class DreamDbContext: DbContext
    {
        public DreamDbContext() : base("DefaultConnection")
        {
                
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<Company>().Property(e => e.Industry).HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<Company>().Property(e => e.Sector).HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<Company>().Property(e => e.SummaryUrl).HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<Company>().Property(e => e.LiveQuoteJson).HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<Company>().Property(e => e.HighestPrice52).HasPrecision(10, 2);
            modelBuilder.Entity<Company>().Property(e => e.LowestPrice52).HasPrecision(10, 2);
            modelBuilder.Entity<Company>().Property(e => e.Price).HasPrecision(10, 2);
            modelBuilder.Entity<Company>().Property(e => e.Volume).HasPrecision(18, 2);
            modelBuilder.Entity<Company>().Property(e => e.MarketCap).HasPrecision(18, 2);

            modelBuilder.Entity<Company>().HasKey(e => e.Ticker);
            modelBuilder.Entity<Company>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Company> Companies { get; set; }
    }
}
