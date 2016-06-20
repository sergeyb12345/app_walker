using System;
using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.data.Models;

namespace dream.walker.data.Services
{
    public interface ICompanyIndicatorService
    {
        List<CompanyToProcess> FindCompaniesToProcess(int maxCompanyCount);
        List<Indicator> GetRegisteredIndicators();
        void Update(string ticker, string jsonData, Indicator indicator);
        List<CompanyIndicator> GetIndicators(string ticker);
        List<Indicator> RegisterCommonIndicators();
    }
}