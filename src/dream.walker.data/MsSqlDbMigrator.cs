using System;
using System.Data.Entity.Migrations;
using System.Linq;

namespace dream.walker.data
{
    public class MsSqlDbMigrator
    {
        public static void UpgradeDatabase()
        {
            try
            {
                var dbMigrator = new DbMigrator(new Migrations.Configuration());

                if (dbMigrator.GetPendingMigrations().Any())
                {
                    dbMigrator.Update();
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
