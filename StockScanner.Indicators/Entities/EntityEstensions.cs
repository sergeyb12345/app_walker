using System.Collections.Generic;
using System.Linq;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators.Entities
{
    public static class EntityEstensions
    {
        public static bool IsLessThan(this List<ICalculated> calcList, double value, string key)
        {
            if (calcList.Count > 0)
                return calcList.LastOrDefault().GetValue(key).CompareTo(value) < 0;

            return false;
        }

        public static bool IsGreaterThan(this List<ICalculated> calcList, double value, string key)
        {
            if (calcList.Count > 0)
                return calcList.LastOrDefault().GetValue(key).CompareTo(value) > 0;

            return false;
        }

        public static bool IsRaising(this List<ICalculated> calcList, string key)
        {
            if (calcList.Count > 0 && calcList.LastOrDefault().GetDelta(key) > 0)
                return true;

            return false;
        }

        public static bool IsRaisingFromBelow(this List<ICalculated> calcList, string key)
        {
            if (calcList.Count > 1)
            {
                var last = calcList[calcList.Count - 1];
                var prev = calcList[calcList.Count - 2];

                if (last.GetDelta(key) > 0 && prev.GetValue(key) < 0)
                {
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        ///     Returns TRUE if indicator changed direction
        /// </summary>
        /// <param name="calcList"></param>
        /// <param name="maxPeriodDelay">Max period count after reversal</param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static bool IsReversal(this List<ICalculated> calcList, int maxPeriodDelay, string key)
        {
            if (maxPeriodDelay < 0 || maxPeriodDelay > 40)
                maxPeriodDelay = 0;

            for (var i = 0; i < maxPeriodDelay; i++)
            {
                if (calcList.Count > 1 + i)
                {
                    var li = calcList[calcList.Count - 1 - i];
                    var pi = calcList[calcList.Count - 2 - i];

                    if ((pi.GetDelta(key) >= 0 && li.GetDelta(key) < 0) ||
                        (pi.GetDelta(key) <= 0 && li.GetDelta(key) > 0))
                        return true;
                }
            }

            return false;
        }

        /// <summary>
        ///     Attaches the specified attach to.
        /// </summary>
        /// <param name="attachTo">The attach to.</param>
        /// <param name="attachThis">The attach this.</param>
        /// <param name="thisKey">The this key.</param>
        /// <param name="toKey">To key.</param>
        /// <returns></returns>
        public static List<ICalculated> Attach(this List<ICalculated> attachTo, List<ICalculated> attachThis,
            string thisKey, string toKey)
        {
            if (attachTo.Count == 0)
            {
                attachTo = (from source in attachThis
                    select
                        new Calculated(source.CalculatedItemId, source.TimePeriod, source.Date, toKey,
                            source.GetValue(thisKey), null))
                    .Cast<ICalculated>()
                    .OrderBy(c => c.Date)
                    .ToList();
            }
            else
            {
                foreach (var calculated in attachThis)
                {
                    var calc = calculated;
                    var item = attachTo.FirstOrDefault(c => c.CalculatedItemId == calc.CalculatedItemId);
                    if (item != null)
                        item.SetValue(toKey, calc.GetValue(thisKey));
                }
            }

            ICalculated previous = null;
            foreach (var calculated in attachTo)
            {
                calculated.Previous = previous;
                previous = calculated;
            }

            return attachTo;
        }


        /// <summary>
        ///     Substracts the specified from set.
        /// </summary>
        /// <param name="fromSet">From set.</param>
        /// <param name="set">The set.</param>
        /// <param name="fromKey">From key.</param>
        /// <param name="key">The dest key.</param>
        /// <param name="destKey"></param>
        /// <returns></returns>
        public static List<ICalculated> Substract(this List<ICalculated> fromSet, List<ICalculated> set, string fromKey,
            string key, string destKey)
        {
            if (set == null || set.Count == 0)
            {
                return fromSet;
            }

            var calcData = (from s1 in fromSet
                join s2 in set on s1.CalculatedItemId equals s2.CalculatedItemId
                select
                    new Calculated(s1.CalculatedItemId, s1.TimePeriod, s1.Date, destKey,
                        s1.GetValue(fromKey) - s2.GetValue(key), null)
                ).Cast<ICalculated>().OrderBy(c => c.Date).ToList();


            if (calcData.Count > 0)
            {
                ICalculated previous = null;
                foreach (var calculated in calcData)
                {
                    calculated.Previous = previous;
                    previous = calculated;
                }
            }
            return calcData;
        }


        /// <summary>
        ///     String To Int
        /// </summary>
        /// <param name="svalue"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static int ToInt(this string svalue, int defaultValue)
        {
            if (!string.IsNullOrEmpty(svalue))
            {
                var i = 0;
                if (int.TryParse(svalue, out i))
                {
                    return i;
                }
            }
            return defaultValue;
        }
    }
}