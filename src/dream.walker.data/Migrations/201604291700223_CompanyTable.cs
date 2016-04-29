namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CompanyTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Company",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        Name = c.String(nullable: false, maxLength: 255, unicode: false),
                        MarketCap = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Sector = c.String(maxLength: 255, unicode: false),
                        Industry = c.String(maxLength: 255, unicode: false),
                        SummaryUrl = c.String(maxLength: 255, unicode: false),
                        LastUpdated = c.DateTime(nullable: false),
                        LastCalculated = c.DateTime(nullable: false),
                        Volume = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Price = c.Decimal(nullable: false, precision: 10, scale: 2),
                        HighestPrice52 = c.Decimal(nullable: false, precision: 10, scale: 2),
                        LowestPrice52 = c.Decimal(nullable: false, precision: 10, scale: 2),
                        ChaosPercentage = c.Int(nullable: false),
                        LiveQuoteJson = c.String(maxLength: 255, unicode: false),
                        HistoryQuotesJson = c.String(),
                        NextReportDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Ticker);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Company");
        }
    }
}
