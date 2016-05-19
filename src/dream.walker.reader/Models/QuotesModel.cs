using System;
using System.Globalization;

namespace dream.walker.reader.Models
{
    //"date","close","volume","open","high","low"
    public class QuotesModel
    {
        public DateTime Date { get; set; }
        public Decimal Close { get; set; }
        public Decimal Volume {
            get
            {
                decimal result = 0;
                if (decimal.TryParse(VolumeAsText.Replace(",", ""), out result))
                {
                    return result;
                }
                return 0;
            }
            set { VolumeAsText = value.ToString(CultureInfo.InvariantCulture); }
        }

        public Decimal Open { get; set; }
        public Decimal High { get; set; }
        public Decimal Low { get; set; }
        public string VolumeAsText { get; set; }
    }


}
