using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.Annotations;
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
            //Company
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


            //Indicator
            modelBuilder.Entity<Indicator>().HasKey(e => e.IndicatorId);
            modelBuilder.Entity<Indicator>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Indicator>().Property(e => e.Description).HasColumnType("varchar").HasMaxLength(1000);
            modelBuilder.Entity<Indicator>().Property(e => e.JsonParams).IsRequired().HasColumnType("varchar").HasMaxLength(255);

            //CompanyIndicator
            modelBuilder.Entity<CompanyIndicator>().HasKey(e => new { e.Ticker, e.IndicatorId });
            modelBuilder.Entity<CompanyIndicator>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            //CompanyIndicatorRule
            modelBuilder.Entity<CompanyIndicatorRule>().HasKey(e => new { e.Ticker, e.IndicatorRuleId });
            modelBuilder.Entity<CompanyIndicatorRule>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            //CompanyRule
            modelBuilder.Entity<CompanyRule>().HasKey(e => new { e.Ticker, e.RuleId });
            modelBuilder.Entity<CompanyRule>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            //StrategyRule
            modelBuilder.Entity<StrategyRule>().HasKey(e => new { e.StrategyId, e.RuleId });

            //Rule
            modelBuilder.Entity<Rule>().HasKey(e => e.RuleId);
            modelBuilder.Entity<Rule>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Rule>().Property(e => e.Description).HasColumnType("varchar").HasMaxLength(1000);

            //Strategy
            modelBuilder.Entity<Strategy>().HasKey(e => e.StrategyId);
            modelBuilder.Entity<Strategy>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(255);

            //IndicatorRule
            modelBuilder.Entity<IndicatorRule>().HasKey(e => e.Id);
            modelBuilder.Entity<IndicatorRule>().Property(e => e.JsonCompareWhat).IsRequired().HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<IndicatorRule>().Property(e => e.JsonCompareWith).IsRequired().HasColumnType("varchar").HasMaxLength(255);
            modelBuilder.Entity<IndicatorRule>().Property(t => t.RuleId).IsRequired().HasColumnAnnotation(
                IndexAnnotation.AnnotationName, new IndexAnnotation(new IndexAttribute("IX_RuleIdIndicatorId", 1) { IsUnique = true }));
            modelBuilder.Entity<IndicatorRule>().Property(t => t.IndicatorId).IsRequired().HasColumnAnnotation(
                IndexAnnotation.AnnotationName, new IndexAnnotation(new IndexAttribute("IX_RuleIdIndicatorId", 2) { IsUnique = true }));


            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Indicator> Indicators { get; set; }
        public DbSet<CompanyIndicator> CompanyIndicators { get; set; }
        public DbSet<CompanyIndicatorRule> CompanyIndicatorRules { get; set; }
        public DbSet<CompanyRule> CompanyRules { get; set; }
        public DbSet<IndicatorRule> IndicatorRules { get; set; }
        public DbSet<Rule> Rules { get; set; }
        public DbSet<Strategy> Strategies { get; set; }
        public DbSet<StrategyRule> StrategyRules { get; set; }
    }
}
