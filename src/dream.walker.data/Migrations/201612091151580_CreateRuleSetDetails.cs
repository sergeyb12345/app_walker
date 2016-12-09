namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateRuleSetDetails : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RuleSetDetails",
                c => new
                    {
                        RuleId = c.Int(nullable: false),
                        RuleSetId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.RuleId, t.RuleSetId })
                .ForeignKey("dbo.Rule", t => t.RuleId, cascadeDelete: true)
                .ForeignKey("dbo.RuleSet", t => t.RuleSetId, cascadeDelete: true)
                .Index(t => t.RuleId)
                .Index(t => t.RuleSetId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RuleSetDetails", "RuleSetId", "dbo.RuleSet");
            DropForeignKey("dbo.RuleSetDetails", "RuleId", "dbo.Rule");
            DropIndex("dbo.RuleSetDetails", new[] { "RuleSetId" });
            DropIndex("dbo.RuleSetDetails", new[] { "RuleId" });
            DropTable("dbo.RuleSetDetails");
        }
    }
}
