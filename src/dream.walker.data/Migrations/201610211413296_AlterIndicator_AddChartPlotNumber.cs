namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterIndicator_AddChartPlotNumber : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Indicator", "ChartPlotNumber", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Indicator", "ChartPlotNumber");
        }
    }
}
