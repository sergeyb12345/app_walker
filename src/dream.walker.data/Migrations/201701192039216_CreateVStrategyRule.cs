using System;
using System.Data.Entity.Migrations;

namespace dream.walker.data.Migrations
{ 
    public partial class CreateVStrategyRule : DbMigration
    {
        public override void Up()
        {
            this.Sql(@"
                IF object_id(N'[dbo].[vStrategyRule]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategyRule]
                GO

                CREATE VIEW [dbo].[vStrategyRule] AS

	                SELECT 
		                S.[StrategyId], RS.[RuleSetId], RS.[Name] AS RuleSetName,
		                R.[RuleId], R.[Name] AS RuleName, R.[Period], R.[DataSeriesV1], R.[DataSeriesV2],
		                R.[ConstV1], R.[ConstV2], R.[SkipItemsV1], R.[SkipItemsV2],
		                R.[TakeItemsV1], R.[TakeItemsV2], R.[TransformItemsV1], R.[TransformItemsV2],
		                R.[DataSourceV1], R.[DataSourceV2], R.[Condition]

	                FROM [dbo].[RuleSet] RS
		                INNER JOIN [dbo].[RuleSetDetails] RD ON RS.RuleSetId = RD.RuleSetId
		                INNER JOIN [dbo].[StrategyRuleSet] S ON S.RuleSetId = RS.RuleSetId
		                INNER JOIN [dbo].[Rule] R ON RD.RuleId = R.RuleId
	                WHERE RS.[Deleted] = 0 AND R.[Deleted] = 0 AND S.[Deleted] = 0

            ");
        }

        public override void Down()
        {
            this.Sql(@"
                IF object_id(N'[dbo].[vStrategyRule]', 'V') IS NOT NULL
	                DROP VIEW [dbo].[vStrategyRule]
                GO
            ");
        }
    }
}
