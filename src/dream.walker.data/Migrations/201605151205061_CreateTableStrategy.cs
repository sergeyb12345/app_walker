namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableStrategy : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Strategy",
                c => new
                    {
                        StrategyId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255, unicode: false),
                        Description = c.String(),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.StrategyId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Strategy");
        }
    }
}
