namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableCompanyRule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CompanyRule",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        RuleId = c.Int(nullable: false),
                        IsValid = c.Boolean(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => new { t.Ticker, t.RuleId })
                .ForeignKey("dbo.Rule", t => t.RuleId, cascadeDelete: true)
                .Index(t => t.RuleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CompanyRule", "RuleId", "dbo.Rule");
            DropIndex("dbo.CompanyRule", new[] { "RuleId" });
            DropTable("dbo.CompanyRule");
        }
    }
}
