using System;
using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.data.Entities.Companies;
using dream.walker.data.Managers;
using dream.walker.data.Models;
using dream.walker.data.Requests;
using dream.walker.reader.Models;

namespace dream.walker.data.Services
{
    public interface ICompanyService : ICompanyManagerService
    {
        Company Register(CompanyModel company);
        List<CompanyToUpdate> FindCompaniesForUpdate(FindCompaniesForUpdateRequest request);
        void UpdateQuotes(UpdateQuotesRequest request);
        List<QuotesModel> GetQuotes(string ticker);
        List<CompanyToProcess> FindCompaniesToProcess(CompaniesToProcessRequest request);
        void SetLastCalculated(string ticker);
        void UpdateMetrics(UpdateMetricsRequest updateMetricsRequest);
        void UpdateMetricsFailed(UpdateMetricsFailedRequest updateMetricsFailedRequest);
    }

    public interface ICompanyManagerService 
    {
        CompanyManager CreateManager(CompanyModel company);
    }
}