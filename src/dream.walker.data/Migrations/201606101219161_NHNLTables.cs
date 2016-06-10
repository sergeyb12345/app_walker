namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NHNLTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CompanyNHNL",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        Period = c.Int(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                        JsonData = c.String(),
                    })
                .PrimaryKey(t => new { t.Ticker, t.Period });
            
            CreateTable(
                "dbo.MarketNHNL",
                c => new
                    {
                        Market = c.String(nullable: false, maxLength: 50, unicode: false),
                        Period = c.Int(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                        JsonData = c.String(),
                    })
                .PrimaryKey(t => new { t.Market, t.Period });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MarketNHNL");
            DropTable("dbo.CompanyNHNL");
        }
    }
}
