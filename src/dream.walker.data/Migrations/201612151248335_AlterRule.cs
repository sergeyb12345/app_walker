namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlterRule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rule", "DataSourceV1", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSourceV2", c => c.Int(nullable: false));
            DropColumn("dbo.Rule", "DataSouceV1");
            DropColumn("dbo.Rule", "DataSouceV2");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Rule", "DataSouceV2", c => c.Int(nullable: false));
            AddColumn("dbo.Rule", "DataSouceV1", c => c.Int(nullable: false));
            DropColumn("dbo.Rule", "DataSourceV2");
            DropColumn("dbo.Rule", "DataSourceV1");
        }
    }
}
