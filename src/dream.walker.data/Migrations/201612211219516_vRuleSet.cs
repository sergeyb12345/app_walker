namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class vRuleSet : DbMigration
    {
        public override void Up()
        {
            this.Sql(@"CREATE VIEW dbo.vRuleSet AS
	            SELECT	RS.[RuleSetId], RS.[Name] AS RuleSetName, RS.[Period], RS.[Deleted],
			            R.[RuleId], R.[Name] AS RuleName, RD.[OrderId]
	            FROM [dbo].[RuleSet] RS
		            INNER JOIN [dbo].[RuleSetDetails] RD ON RS.RuleSetId = RD.RuleSetId
		            INNER JOIN [dbo].[Rule] R ON RD.RuleId = R.RuleId");
            
            DropColumn("dbo.RuleSetDetails", "Deleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RuleSetDetails", "Deleted", c => c.Boolean(nullable: false));
            this.Sql(@"IF object_id(N'dbo.vRuleSet', 'V') IS NOT NULL
	            DROP VIEW dbo.vRuleSet");
        }
    }
}
