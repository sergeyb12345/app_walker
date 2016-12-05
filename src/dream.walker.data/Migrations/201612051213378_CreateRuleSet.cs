namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateRuleSet : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RuleSet",
                c => new
                    {
                        RuleSetId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50, unicode: false),
                        Description = c.String(maxLength: 1000, unicode: false),
                        Deleted = c.Boolean(nullable: false),
                        Period = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RuleSetId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.RuleSet");
        }
    }
}
