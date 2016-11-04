using System.Collections.Generic;
using dream.walker.data.Enums;

namespace dream.walker.space.Services.Models
{
    public class ChartIndicator
    {
        public ChartType ChartType { get; set; }
        public string ChartName { get; set; }
        public string[] ChartHeader { get; set; }
        public string[] ChartData { get; set; }
        public string ChartColor { get; set; }
    }
}