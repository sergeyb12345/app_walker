namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableStrategyRule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StrategyRule",
                c => new
                    {
                        StrategyId = c.Int(nullable: false),
                        RuleId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.StrategyId, t.RuleId })
                .ForeignKey("dbo.Rule", t => t.RuleId, cascadeDelete: true)
                .ForeignKey("dbo.Strategy", t => t.StrategyId, cascadeDelete: true)
                .Index(t => t.StrategyId)
                .Index(t => t.RuleId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StrategyRule", "StrategyId", "dbo.Strategy");
            DropForeignKey("dbo.StrategyRule", "RuleId", "dbo.Rule");
            DropIndex("dbo.StrategyRule", new[] { "RuleId" });
            DropIndex("dbo.StrategyRule", new[] { "StrategyId" });
            DropTable("dbo.StrategyRule");
        }
    }
}
