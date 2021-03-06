﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using dream.walker.data.Entities.Articles;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Entities.Strategies;

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


            //CompanyRuleSet
            modelBuilder.Entity<CompanyRuleSet>().HasKey(e => new { e.Ticker, e.RuleSetId });
            modelBuilder.Entity<CompanyRuleSet>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            //StrategyRuleSet
            modelBuilder.Entity<StrategyRuleSet>().HasKey(e => new { e.StrategyId, e.RuleSetId });

            //RuleSetDetails
            modelBuilder.Entity<RuleSetDetails>().HasKey(e => new { e.RuleId, e.RuleSetId });

            //Rule
            modelBuilder.Entity<Rule>().HasKey(e => e.RuleId);
            modelBuilder.Entity<Rule>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Rule>().Property(e => e.Description).HasColumnType("varchar").HasMaxLength(1000);

            modelBuilder.Entity<RuleSet>().HasKey(e => e.RuleSetId);
            modelBuilder.Entity<RuleSet>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<RuleSet>().Property(e => e.Description).HasColumnType("varchar").HasMaxLength(1000);

            //Strategy
            modelBuilder.Entity<Strategy>().HasKey(e => e.StrategyId);
            modelBuilder.Entity<Strategy>().Property(e => e.Name).IsRequired().HasColumnType("varchar").HasMaxLength(255);

            //MarketNHNL
            modelBuilder.Entity<MarketNHNL>().HasKey(e => new { e.Market, e.Period });
            modelBuilder.Entity<MarketNHNL>().Property(e => e.Market).IsRequired().HasColumnType("varchar").HasMaxLength(50);

            //CompanyNHNL
            modelBuilder.Entity<CompanyNHNL>().HasKey(e => new { e.Ticker, e.Period });
            modelBuilder.Entity<CompanyNHNL>().Property(e => e.Ticker).IsRequired().HasColumnType("varchar").HasMaxLength(50);


            modelBuilder.Entity<Article>().HasKey(t => t.ArticleId);
            modelBuilder.Entity<Article>().HasRequired(a => a.Category).WithMany(t => t.Articles).HasForeignKey(p => p.CategoryId);
            modelBuilder.Entity<Article>().Property(a => a.ArticleId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Article>().Property(a => a.Title).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Article>().Property(a => a.Url).IsRequired().HasMaxLength(250);

            modelBuilder.Entity<Category>().HasKey(t => t.CategoryId);
            modelBuilder.Entity<Category>().Property(a => a.CategoryId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Category>().Property(a => a.Title).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Category>().Property(a => a.Url).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Category>().HasRequired(a => a.Section).WithMany(t => t.Categories).HasForeignKey(p => p.SectionId);

            modelBuilder.Entity<Section>().HasKey(t => t.SectionId);
            modelBuilder.Entity<Section>().Property(a => a.SectionId).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            modelBuilder.Entity<Section>().Property(a => a.Title).IsRequired().HasMaxLength(250);
            modelBuilder.Entity<Section>().Property(a => a.Url).IsRequired().HasMaxLength(250);

            modelBuilder.Entity<vRuleSet>().HasKey(t => new { t.RuleId, t.RuleSetId });
            modelBuilder.Entity<vStrategy>().HasKey(t => new { t.StrategyId, t.RuleSetId });
            modelBuilder.Entity<vStrategyRuleSet>().HasKey(t => new { t.StrategyId, t.RuleSetId });

            modelBuilder.Entity<vStrategyRule>().HasKey(t => new { t.StrategyId, t.RuleSetId, t.RuleId });

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Indicator> Indicators { get; set; }
        public DbSet<CompanyIndicator> CompanyIndicators { get; set; }
        public DbSet<CompanyRuleSet> CompanyRuleSets { get; set; }
        public DbSet<Rule> Rules { get; set; }
        public DbSet<RuleSet> RuleSets { get; set; }
        public DbSet<RuleSetDetails> RuleSetDetails { get; set; }
        public DbSet<Strategy> Strategies { get; set; }
        public DbSet<StrategyRuleSet> StrategyRuleSets { get; set; }
        public DbSet<MarketNHNL> MarketNHNLs { get; set; }
        public DbSet<CompanyNHNL> CompanyNHNLs { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Section> Sections { get; set; }
        public virtual DbSet<vRuleSet> vRuleSets { get; set; }
        public virtual DbSet<vStrategy> vStrategies { get; set; }
        public virtual DbSet<vStrategyRuleSet> vStrategyRuleSets { get; set; }
        public virtual DbSet<vStrategyRule> vStrategyRules { get; set; }
    }
}
