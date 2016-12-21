namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AltervRuleSet : DbMigration
    {
        public override void Up()
        {
            Sql(@"IF object_id(N'dbo.vRuleSet', 'V') IS NOT NULL
                DROP VIEW dbo.vRuleSet
                GO

                CREATE VIEW dbo.vRuleSet AS
	                SELECT	RS.[RuleSetId], RS.[Name] AS RuleSetName, RS.[Description], RS.[Period], RS.[Deleted],
			                R.[RuleId], R.[Name] AS RuleName, RD.[OrderId]
	                FROM [dbo].[RuleSet] RS
		                INNER JOIN [dbo].[RuleSetDetails] RD ON RS.RuleSetId = RD.RuleSetId
		                INNER JOIN [dbo].[Rule] R ON RD.RuleId = R.RuleId
                GO
            ");
        }
        
        public override void Down()
        {
        }
    }
}
