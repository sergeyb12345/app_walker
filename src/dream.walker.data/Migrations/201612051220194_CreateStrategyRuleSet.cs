namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateStrategyRuleSet : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StrategyRule", "RuleId", "dbo.Rule");
            DropForeignKey("dbo.StrategyRule", "StrategyId", "dbo.Strategy");
            DropIndex("dbo.StrategyRule", new[] { "StrategyId" });
            DropIndex("dbo.StrategyRule", new[] { "RuleId" });
            CreateTable(
                "dbo.StrategyRuleSet",
                c => new
                    {
                        StrategyId = c.Int(nullable: false),
                        RuleSetId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.StrategyId, t.RuleSetId })
                .ForeignKey("dbo.RuleSet", t => t.RuleSetId, cascadeDelete: true)
                .ForeignKey("dbo.Strategy", t => t.StrategyId, cascadeDelete: true)
                .Index(t => t.StrategyId)
                .Index(t => t.RuleSetId);
            
            DropTable("dbo.StrategyRule");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StrategyRule",
                c => new
                    {
                        StrategyId = c.Int(nullable: false),
                        RuleId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.StrategyId, t.RuleId });
            
            DropForeignKey("dbo.StrategyRuleSet", "StrategyId", "dbo.Strategy");
            DropForeignKey("dbo.StrategyRuleSet", "RuleSetId", "dbo.RuleSet");
            DropIndex("dbo.StrategyRuleSet", new[] { "RuleSetId" });
            DropIndex("dbo.StrategyRuleSet", new[] { "StrategyId" });
            DropTable("dbo.StrategyRuleSet");
            CreateIndex("dbo.StrategyRule", "RuleId");
            CreateIndex("dbo.StrategyRule", "StrategyId");
            AddForeignKey("dbo.StrategyRule", "StrategyId", "dbo.Strategy", "StrategyId", cascadeDelete: true);
            AddForeignKey("dbo.StrategyRule", "RuleId", "dbo.Rule", "RuleId", cascadeDelete: true);
        }
    }
}
