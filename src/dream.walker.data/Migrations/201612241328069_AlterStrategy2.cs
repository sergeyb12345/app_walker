namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterStrategy2 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Strategy", "JsonStrategyBlocks", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Strategy", "JsonStrategyBlocks");
        }
    }
}
