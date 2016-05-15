namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableCompanyIndicator : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CompanyIndicator",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        IndicatorId = c.Int(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                        JsonData = c.String(),
                    })
                .PrimaryKey(t => new { t.Ticker, t.IndicatorId });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CompanyIndicator");
        }
    }
}
