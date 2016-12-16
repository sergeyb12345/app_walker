using System;
using System.Collections.Generic;
using System.Data.Entity;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Indicators;
using dream.walker.data.Enums;
using dream.walker.data.Models;

namespace dream.walker.data
{
    public class DreamDbInitializer : DropCreateDatabaseIfModelChanges<DreamDbContext>
    {
        protected override void Seed(DreamDbContext context)
        {
            var indicators = new List<Indicator>
            {
                new Indicator{ Name = "EMA", Params = new List<IndicatorParam> {new IndicatorParam {ParamName = IndicatorParamName.Period, Value = 13} }, Period = QuotePeriod.Daily},
                new Indicator{ Name = "EMA", Params = new List<IndicatorParam> {new IndicatorParam {ParamName = IndicatorParamName.Period, Value = 26} }, Period = QuotePeriod.Daily},
                new Indicator{ Name = "EMA", Params = new List<IndicatorParam> {new IndicatorParam {ParamName = IndicatorParamName.Period, Value = 13} }, Period = QuotePeriod.Weekly},
                new Indicator{ Name = "EMA", Params = new List<IndicatorParam> {new IndicatorParam {ParamName = IndicatorParamName.Period, Value = 26} }, Period = QuotePeriod.Weekly},
            };

            indicators.ForEach(i => context.Indicators.Add(i));
            context.SaveChanges();
        }
    }
}