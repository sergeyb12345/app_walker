namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Indicator", "ChartType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Indicator", "ChartType");
        }
    }
}
