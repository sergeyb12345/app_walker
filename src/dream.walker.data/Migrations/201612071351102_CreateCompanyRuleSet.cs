namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateCompanyRuleSet : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CompanyRule", "RuleId", "dbo.Rule");
            DropIndex("dbo.CompanyRule", new[] { "RuleId" });
            CreateTable(
                "dbo.CompanyRuleSet",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        RuleSetId = c.Int(nullable: false),
                        IsValid = c.Boolean(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => new { t.Ticker, t.RuleSetId })
                .ForeignKey("dbo.RuleSet", t => t.RuleSetId, cascadeDelete: true)
                .Index(t => t.RuleSetId);
            
            DropTable("dbo.CompanyIndicatorRule");
            DropTable("dbo.CompanyRule");
        }
        
        public override void Down()
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
                .PrimaryKey(t => new { t.Ticker, t.RuleId });
            
            CreateTable(
                "dbo.CompanyIndicatorRule",
                c => new
                    {
                        Ticker = c.String(nullable: false, maxLength: 50, unicode: false),
                        IndicatorRuleId = c.Int(nullable: false),
                        Valid = c.Boolean(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => new { t.Ticker, t.IndicatorRuleId });
            
            DropForeignKey("dbo.CompanyRuleSet", "RuleSetId", "dbo.RuleSet");
            DropIndex("dbo.CompanyRuleSet", new[] { "RuleSetId" });
            DropTable("dbo.CompanyRuleSet");
            CreateIndex("dbo.CompanyRule", "RuleId");
            AddForeignKey("dbo.CompanyRule", "RuleId", "dbo.Rule", "RuleId", cascadeDelete: true);
        }
    }
}
