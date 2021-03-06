﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        void UpdateMetricsFailed(UpdateMetricsFailedRequest updateMetricsFailedRequest);

        Task<List<CompanyDetails>> SearchAsync(CompanySearchRequest request);
        Task<CompanyHeader> GetAsync(string ticker);
    }

    public interface ICompanyManagerService 
    {
        CompanyManager CreateManager(CompanyModel company);
    }
}