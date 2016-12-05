namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterTableRule : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.IndicatorRule", "IX_RuleIdIndicatorId");
            AddColumn("dbo.Rule", "Period", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSouceV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSouceV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSeriesV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSeriesV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "ConstV1", c => c.String());
            AddColumn("dbo.Rule", "ConstV2", c => c.String());
            AddColumn("dbo.Rule", "SkipItemsV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "SkipItemsV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "TakeItemsV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "TakeItemsV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "TransformItemsV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "TransformItemsV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "Condition", c => c.Int(nullable: false));
            DropTable("dbo.IndicatorRule");
        }
        
        public override void Down()
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
                .PrimaryKey(t => t.Id);
            
            DropColumn("dbo.Rule", "Condition");
            DropColumn("dbo.Rule", "TransformItemsV2");
            DropColumn("dbo.Rule", "TransformItemsV1");
            DropColumn("dbo.Rule", "TakeItemsV2");
            DropColumn("dbo.Rule", "TakeItemsV1");
            DropColumn("dbo.Rule", "SkipItemsV2");
            DropColumn("dbo.Rule", "SkipItemsV1");
            DropColumn("dbo.Rule", "ConstV2");
            DropColumn("dbo.Rule", "ConstV1");
            DropColumn("dbo.Rule", "DataSeriesV2");
            DropColumn("dbo.Rule", "DataSeriesV1");
            DropColumn("dbo.Rule", "DataSouceV2");
            DropColumn("dbo.Rule", "DataSouceV1");
            DropColumn("dbo.Rule", "Period");
            CreateIndex("dbo.IndicatorRule", new[] { "RuleId", "IndicatorId" }, unique: true, name: "IX_RuleIdIndicatorId");
        }
    }
}
