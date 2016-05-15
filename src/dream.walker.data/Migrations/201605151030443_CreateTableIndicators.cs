namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTableIndicators : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Indicator",
                c => new
                    {
                        IndicatorId = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50, unicode: false),
                        Description = c.String(maxLength: 1000, unicode: false),
                        QuotePeriod = c.Int(nullable: false),
                        JsonParams = c.String(nullable: false, maxLength: 255, unicode: false),
                        LastUpdated = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.IndicatorId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Indicator");
        }
    }
}
