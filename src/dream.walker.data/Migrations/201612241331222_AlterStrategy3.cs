namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterStrategy3 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Strategy", "JsonArticleBlocks", c => c.String());
            DropColumn("dbo.Strategy", "JsonStrategyBlocks");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Strategy", "JsonStrategyBlocks", c => c.String());
            DropColumn("dbo.Strategy", "JsonArticleBlocks");
        }
    }
}
