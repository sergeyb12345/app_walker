namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreatevStrategyRuleSet : DbMigration
    {
        public override void Up()
        {
            this.Sql(@"
                IF object_id(N'[dbo].[vStrategyRuleSet]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategyRuleSet]
                GO

                CREATE VIEW [dbo].[vStrategyRuleSet] AS

	                SELECT	S.[StrategyId], S.Active AS StrategyActive, 
			                RS.[RuleSetId], RS.[Name] AS RuleSetName, RS.[Description] AS RuleSetDescription, 
			                RS.Period AS RuleSetPeriod, SRS.OrderId AS RuleSetOrderId, SRS.Optional AS RuleSetOptional
	                FROM [dbo].[Strategy] S
		                INNER JOIN [dbo].[StrategyRuleSet] SRS ON SRS.[StrategyId] = S.[StrategyId]
		                INNER JOIN [dbo].[RuleSet] RS ON SRS.RuleSetId = RS.RuleSetId
            ");

        }
        
        public override void Down()
        {
            this.Sql(@"
                IF object_id(N'[dbo].[vStrategyRuleSet]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategyRuleSet]
                GO
            ");
        }
    }
}
