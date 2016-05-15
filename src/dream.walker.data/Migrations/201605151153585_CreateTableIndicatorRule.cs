namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableIndicatorRule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.IndicatorRule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RuleId = c.Int(nullable: false),
                        IndicatorId = c.Int(nullable: false),
                        Function = c.Int(nullable: false),
                        Condition = c.Int(nullable: false),
                        JsonCompareWhat = c.String(nullable: false, maxLength: 255, unicode: false),
                        JsonCompareWith = c.String(nullable: false, maxLength: 255, unicode: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => new { t.RuleId, t.IndicatorId }, unique: true, name: "IX_RuleIdIndicatorId");
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.IndicatorRule", "IX_RuleIdIndicatorId");
            DropTable("dbo.IndicatorRule");
        }
    }
}
