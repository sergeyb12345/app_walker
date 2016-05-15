namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableRule : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rule",
                c => new
                    {
                        RuleId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50, unicode: false),
                        Description = c.String(maxLength: 1000, unicode: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.RuleId);
            
            AddColumn("dbo.Indicator", "Deleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Indicator", "Deleted");
            DropTable("dbo.Rule");
        }
    }
}
