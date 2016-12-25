namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateViewStrategy : DbMigration
    {
        public override void Up()
        {
            this.Sql(@"
                IF object_id(N'[dbo].[vStrategy]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategy]
                GO

                CREATE VIEW [dbo].[vStrategy] AS

	                SELECT	S.[StrategyId], S.[Name] AS StrategyName, S.[Description] AS StrategyDescription, 
			                S.[Url], S.[Deleted],
			                RS.[RuleSetId], RS.[Name] AS RuleSetName, RS.[Description] AS RuleSetDescription, 
			                RS.Period, SRS.OrderId, SRS.Optional
	                FROM [dbo].[Strategy] S
		                INNER JOIN [dbo].[StrategyRuleSet] SRS ON SRS.[StrategyId] = S.[StrategyId]
		                INNER JOIN [dbo].[RuleSet] RS ON SRS.RuleSetId = RS.RuleSetId

            ");

        }

        public override void Down()
        {
            this.Sql(@"

                IF object_id(N'[dbo].[vStrategy]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategy]
                GO

            ");
        }
    }
}
