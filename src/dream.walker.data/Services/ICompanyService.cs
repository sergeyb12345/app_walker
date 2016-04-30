﻿using System.Collections.Generic;
using dream.walker.data.Entities;
using dream.walker.data.Managers;
using dream.walker.data.Models;
using dream.walker.data.Requests;
using dream.walker.reader.Models;

namespace dream.walker.data.Services
{
    public interface ICompanyService : ICompanyManagerService
    {
        Company Register(CompanyModel company);
        List<CompanyTradingData> FindCompaniesForUpdate(FindCompaniesForUpdateRequest request);
    }

    public interface ICompanyManagerService 
    {
        CompanyManager CreateManager(CompanyModel company);
    }
}