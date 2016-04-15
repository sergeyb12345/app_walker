using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(dream.walker.space.Startup))]
namespace dream.walker.space
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
