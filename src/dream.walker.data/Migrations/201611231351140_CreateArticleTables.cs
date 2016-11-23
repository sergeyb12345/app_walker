namespace dream.walker.data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateArticleTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Article",
                c => new
                    {
                        ArticleId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 250),
                        Url = c.String(nullable: false, maxLength: 250),
                        CategoryId = c.Int(nullable: false),
                        OrderId = c.Int(nullable: false),
                        JsonArticleBlocks = c.String(),
                        IsFeatured = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ArticleId)
                .ForeignKey("dbo.Category", t => t.CategoryId, cascadeDelete: true)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Category",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 250),
                        OrderId = c.Int(nullable: false),
                        Url = c.String(nullable: false, maxLength: 250),
                        SectionId = c.Int(nullable: false),
                        Deleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CategoryId)
                .ForeignKey("dbo.Section", t => t.SectionId, cascadeDelete: true)
                .Index(t => t.SectionId);
            
            CreateTable(
                "dbo.Section",
                c => new
                    {
                        SectionId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false, maxLength: 250),
                        Url = c.String(nullable: false, maxLength: 250),
                        OrderId = c.Int(nullable: false),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.SectionId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Article", "CategoryId", "dbo.Category");
            DropForeignKey("dbo.Category", "SectionId", "dbo.Section");
            DropIndex("dbo.Category", new[] { "SectionId" });
            DropIndex("dbo.Article", new[] { "CategoryId" });
            DropTable("dbo.Section");
            DropTable("dbo.Category");
            DropTable("dbo.Article");
        }
    }
}
