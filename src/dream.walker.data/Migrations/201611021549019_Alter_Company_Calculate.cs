namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Alter_Company_Calculate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Company", "CalculatedSuccessful", c => c.Boolean(nullable: false));
            AddColumn("dbo.Company", "CalculatedError", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Company", "CalculatedError");
            DropColumn("dbo.Company", "CalculatedSuccessful");
        }
    }
}
