namespace dream.walker.playground.Models
{
    public class ChartDataModel
    {
        public ChartDataModel()
        {
            Weekly = new ChartData();
            Daily = new ChartData();    
        }

        public ChartData Weekly { get; set; }
        public ChartData Daily { get; set; }
        public int Bars { get; set; }
    }
}