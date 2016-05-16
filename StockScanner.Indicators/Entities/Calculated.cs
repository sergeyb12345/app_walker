using System;
using System.Collections.Generic;
using System.Linq;
using StockScanner.Interfaces.Indicators;

namespace StockScanner.Indicators.Entities
{
    /// <summary>
    /// </summary>
    public class Calculated : ICalculated
    {
        private Dictionary<string, double> _values;


        /// <summary>
        ///     Gets the value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public double GetValue(string key)
        {
            if (_values != null && _values.ContainsKey(key))
                return _values[key];

            return 0;
        }

        /// <summary>
        ///     Gets past value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="pastBars">The past bars.</param>
        /// <returns></returns>
        public double GetValue(string key, int pastBars)
        {
            ICalculated calcItem = this;
            while (pastBars > 0 && calcItem != null)
            {
                pastBars -= 1;
                calcItem = calcItem.Previous;
            }

            if (calcItem != null)
                return calcItem.GetValue(key);

            return 0;
        }


        /// <summary>
        ///     Sets the value.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        public void SetValue(string key, double value)
        {
            if (_values == null)
                _values = new Dictionary<string, double>();

            if (_values.ContainsKey(key))
                _values[key] = value;
            else
                _values.Add(key, value);
        }


        /// <summary>
        ///     Moves the value.
        /// </summary>
        /// <param name="sourceKey">The source key.</param>
        /// <param name="destKey">The dest key.</param>
        public void MoveValue(string sourceKey, string destKey)
        {
            var value = GetValue(sourceKey);
            SetValue(destKey, value);
            RemoveValue(sourceKey);
        }


        /// <summary>
        ///     Gets the delta.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public double GetDelta(string key)
        {
            if (Previous != null)
                return GetValue(key) - Previous.GetValue(key);

            return 0;
        }

        /// <summary>
        ///     Gets the delta.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <param name="pastBars">The past bars.</param>
        /// <returns></returns>
        public double GetDelta(string key, int pastBars)
        {
            var prev = GetValue(key, pastBars);
            if (prev != 0)
                return GetValue(key) - prev;

            return 0;
        }

        /// <summary>
        ///     Creates a new object that is a copy of the current instance.
        /// </summary>
        /// <returns>
        ///     A new object that is a copy of this instance.
        /// </returns>
        public object Clone()
        {
            var values = _values.ToDictionary(value => value.Key, value => value.Value);

            return new Calculated(CalculatedItemId, TimePeriod, Date, values, Previous);
        }

        /// <summary>
        ///     Removes the value.
        /// </summary>
        /// <param name="sourceKey">The source key.</param>
        private void RemoveValue(string sourceKey)
        {
            if (_values != null && _values.ContainsKey(sourceKey))
                _values.Remove(sourceKey);
        }

        #region Public Properties

        public int CalculatedItemId { get; }
        public int TimePeriod { get; }
        public DateTime Date { get; }
        public ICalculated Previous { get; set; }

        #endregion

        #region Constructors

        /// <summary>
        ///     Initializes a new instance of the <see cref="Calculated" /> class.
        /// </summary>
        /// <param name="calculatedItemId">The calculated item id.</param>
        /// <param name="timePeriod">The time period.</param>
        /// <param name="date">The date.</param>
        /// <param name="values">The values.</param>
        /// <param name="previous">The previous.</param>
        public Calculated(int calculatedItemId, int timePeriod, DateTime date, Dictionary<string, double> values,
            ICalculated previous)
        {
            _values = values;
            CalculatedItemId = calculatedItemId;
            TimePeriod = timePeriod;
            Date = date;
            Previous = previous;
        }

        /// <summary>
        ///     Initializes a new instance of the <see cref="Calculated" /> class.
        /// </summary>
        /// <param name="calculatedItemId">The calculated item id.</param>
        /// <param name="timePeriod">The time period.</param>
        /// <param name="date">The date.</param>
        /// <param name="key">The key.</param>
        /// <param name="value">The value.</param>
        /// <param name="previous">The previous.</param>
        public Calculated(int calculatedItemId, int timePeriod, DateTime date, string key, double value,
            ICalculated previous)
        {
            SetValue(key, value);

            CalculatedItemId = calculatedItemId;
            TimePeriod = timePeriod;
            Date = date;
            Previous = previous;
        }

        #endregion
    }
}