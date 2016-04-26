namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterCompany : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Company",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false),
                        MarketCap = c.Double(nullable: false),
                        Sector = c.String(),
                        Industry = c.String(),
                        SummaryUrl = c.String(),
                        LastUpdated = c.DateTime(nullable: false),
                        LastCalculated = c.DateTime(nullable: false),
                        Volume = c.Double(nullable: false),
                        Price = c.Double(nullable: false),
                        HighestPrice52 = c.Double(nullable: false),
                        LowestPrice52 = c.Double(nullable: false),
                        ChaosPercentage = c.Int(nullable: false),
                        LiveQuoteJson = c.String(),
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
