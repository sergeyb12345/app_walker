namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterIndicator_AddChartColor : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Indicator", "ChartColor", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Indicator", "ChartColor");
        }
    }
}
